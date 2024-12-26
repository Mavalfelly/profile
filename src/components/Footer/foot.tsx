import { 
  logoGithub, 
  mailOutline, 
  logoLinkedin 
} from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-gray-800 text-white py-4 bottom-0 w-full">
      <div className="flex gap-8 mb-4">
        <a href="https://github.com/mavalfelly" className="text-4xl hover:text-gray-400">
          <IonIcon icon={logoGithub} />
        </a>
        <a href="mailto:mattfelly@gmail.com" className="text-4xl hover:text-gray-400">
          <IonIcon icon={mailOutline} />
        </a>
        <a
          href="https://www.linkedin.com/in/matthew-feliciano-4621a5201/"
          className="text-4xl hover:text-gray-400"
        >
          <IonIcon icon={logoLinkedin} />
        </a>
      </div>

      <div id="build" className="text-center">
        <p className="text-sm text-gray-400">
          Built by Matt using React, TypeScript, JavaScript, Tailwind, and Redbulls.
        </p>
      </div>
    </footer>
  );
};

export default Footer;