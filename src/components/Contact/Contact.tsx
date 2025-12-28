import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing. Please check your environment variables.');
      setStatus("Configuration error. Please contact the site administrator.");
      return;
    }

    setIsLoading(true);
    setStatus(null);

    emailjs
      .sendForm(
        serviceId,
        templateId, 
        form.current,
        publicKey,
      )
      .then(
        () => {
          console.log('SUCCESS!');
          setStatus('Your message has been sent successfully. Please be on the lookout for a response within the next 24 hours.');
          form.current?.reset();
        },
        (error) => {
          console.error('FAILED...', error.text || error);
          setStatus("I'm sorry, unfortunately something went wrong and your message wasn't sent. Please try again in a few minutes.");
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section id='contact_me' className="relative min-h-screen flex flex-col items-center justify-center text-white py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black"></div>
      
      <div className="z-10 max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">Get In Touch</h2>
          <p className="text-xl text-gray-300">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>
        
        {status && (
          <div className={`z-10 text-center p-6 rounded-lg mb-8 animate-fade-in ${
            status.includes('successfully') 
              ? 'bg-green-500/20 border-2 border-green-500 text-green-100' 
              : 'bg-red-500/20 border-2 border-red-500 text-red-100'
          }`}>
            <p className="text-lg">{status}</p>
          </div>
        )}
        
        {!status && (
          <form
            ref={form}
            onSubmit={sendEmail}
            className="z-10 bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <input
                  type="text"
                  name="from_name"
                  className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                <textarea
                  name="message"
                  className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all resize-none"
                  rows={6}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-lime-500 to-green-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
