import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        'Profile',
        'portfo', 
        form.current,
        'gRckUfUM1Cosvs5dx',
      )
      .then(
        () => {
          console.log('SUCCESS!');
          setStatus('Your message have been sent successfully. Please be on the lookout for a response within the next 24 hours 😊 ')
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatus("I'm sorry, unfortunately something went wrong and your message wasnt sent. Please try again in a few minutes.")
        },
      );
  };

  return (
    <section id='contact_me' className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="z-10 text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
        <p className="text-lg">
          Reach out for collaborations, inquiries, or just to say hi!
        </p>
      </div>
      {status ? (
        <div className="z-10 text-center bg-green-500 text-white p-4 rounded-lg mb-4">
          <p>{status}</p>
        </div>
      ) : (
      <form
        ref={form}
        onSubmit={sendEmail}
        className="z-10 bg-gray-800 bg-opacity-75 p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-auto space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="from_name"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="user_email"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            rows={5}
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Send"
            className="w-full px-4 py-2 bg-lime-600  text-white rounded cursor-pointer hover:bg-lime-800"
          />
        </div>
      </form>
      )}
    </section>
  );
};
