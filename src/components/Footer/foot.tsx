
const Footer = () => {
    return (
      <footer className="flex justify-center items-center bg-gray-800 text-white py-4 fixed bottom-0 w-full">
        <div className="flex gap-8">
          <a href="https://github.com/mavalfelly" className="text-4xl hover:text-gray-400">
            <ion-icon name="logo-github"></ion-icon>
          </a>
          <a href="mailto:mattfelly@gmail.com" className="text-4xl hover:text-gray-400">
            <ion-icon name="mail-outline"></ion-icon>
          </a>
          <a
            href="https://www.linkedin.com/in/matthew-feliciano-4621a5201/"
            className="text-4xl hover:text-gray-400"
          >
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </div>
      </footer>
    );
  };
export default Footer