import React, { useState, useEffect, useRef } from 'react';
import "../Typer/typer.css"

interface TypewriterProps {
  phrases: string[];
  speed: number;
  deleteSpeed: number;
  displayTime: number;
}

const Typer: React.FC<TypewriterProps> = ({ phrases, speed, deleteSpeed, displayTime }) => {
  const [text, setText] = useState<string>('');
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const currentTextLength = useRef<number>(0);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isTyping) {
      timer = setTimeout(() => {
        const nextText = phrase.slice(0, currentTextLength.current + 1);
        setText(nextText);
        currentTextLength.current++;

        if (currentTextLength.current === phrase.length) {
          setIsTyping(false);
          setTimeout(() => {
            setIsDeleting(true);
          }, displayTime);
        }
      }, speed);
    } else if (isDeleting) {
      timer = setTimeout(() => {
        const nextText = text.slice(0, text.length - 1);
        setText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length); 
          setIsTyping(true);
          currentTextLength.current = 0; 
        }
      }, deleteSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isTyping, isDeleting, phraseIndex, phrases, speed, deleteSpeed, displayTime]);

  return <span className="typewriter-text ">{text}<span className="cursor">|</span></span>;
};

export default Typer;