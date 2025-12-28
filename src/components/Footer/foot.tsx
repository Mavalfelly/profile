import { 
  logoGithub, 
  mailOutline, 
  logoLinkedin 
} from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="flex flex-col justify-center items-center bg-black text-white py-12 bottom-0 w-full px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Matthew Feliciano</h3>
            <p className="text-gray-400">Building the future, one line at a time.</p>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-6">
            <a 
              href="https://github.com/mavalfelly" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-lime-400 transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <IonIcon icon={logoGithub} />
            </a>
            <a 
              href="mailto:mattfelly@gmail.com" 
              className="text-3xl hover:text-lime-400 transition-colors duration-300"
              aria-label="Email"
            >
              <IonIcon icon={mailOutline} />
            </a>
            <a
              href="https://www.linkedin.com/in/matthew-feliciano-4621a5201/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-lime-400 transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <IonIcon icon={logoLinkedin} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            © {currentYear} Matthew Feliciano. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;