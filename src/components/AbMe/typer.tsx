import React, { useState, useEffect, useRef } from 'react';
import "../AbMe/typer.css"

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
  const [isTyping, setIsTyping] = useState<boolean>(true); // Start with typing mode

  // Use ref to track the current length of the text being typed
  const currentTextLength = useRef<number>(0);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isTyping) {
      // Typing effect
      timer = setTimeout(() => {
        const nextText = phrase.slice(0, currentTextLength.current + 1);
        setText(nextText);
        currentTextLength.current++;

        if (currentTextLength.current === phrase.length) {
          setIsTyping(false);
          setTimeout(() => {
            setIsDeleting(true);
          }, displayTime); // Wait before starting to delete
        }
      }, speed);
    } else if (isDeleting) {
      // Deleting effect
      timer = setTimeout(() => {
        const nextText = text.slice(0, text.length - 1);
        setText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length); // Move to the next phrase
          setIsTyping(true); // Start typing the next phrase
          currentTextLength.current = 0; // Reset the text length for the next phrase
        }
      }, deleteSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isTyping, isDeleting, phraseIndex, phrases, speed, deleteSpeed, displayTime]);

  return <span className="typewriter-text ">{text}<span className="cursor">|</span></span>;
};

export default Typer;