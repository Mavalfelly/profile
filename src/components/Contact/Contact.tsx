import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { trackFormSubmission } from '../../utils/analytics';
import { getEnv } from '../../utils/env';

interface FormErrors {
  from_name?: string;
  user_email?: string;
  message?: string;
}

export const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'from_name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        return undefined;
      case 'user_email': {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      }
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateForm = (): boolean => {
    if (!form.current) return false;
    
    const formData = new FormData(form.current);
    const newErrors: FormErrors = {};
    
    ['from_name', 'user_email', 'message'].forEach((field) => {
      const value = formData.get(field) as string;
      const error = validateField(field, value || '');
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    setTouched({ from_name: true, user_email: true, message: true });
    
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fix the errors before submitting.");
      return;
    }

    if (!form.current) return;

    const serviceId = getEnv('VITE_EMAILJS_SERVICE_ID');
    const templateId = getEnv('VITE_EMAILJS_TEMPLATE_ID');
    const publicKey = getEnv('VITE_EMAILJS_PUBLIC_KEY');

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
          trackFormSubmission('contact_form', true);
          form.current?.reset();
          setErrors({});
          setTouched({});
        },
        (error) => {
          console.error('FAILED...', error.text || error);
          setStatus("I'm sorry, unfortunately something went wrong and your message wasn't sent. Please try again in a few minutes.");
          trackFormSubmission('contact_form', false);
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
                  className={`w-full p-4 border rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.from_name && touched.from_name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-lime-500 focus:border-transparent'
                  }`}
                  placeholder="Your name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {errors.from_name && touched.from_name && (
                  <p className="mt-2 text-sm text-red-400">{errors.from_name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className={`w-full p-4 border rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.user_email && touched.user_email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-lime-500 focus:border-transparent'
                  }`}
                  placeholder="your.email@example.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {errors.user_email && touched.user_email && (
                  <p className="mt-2 text-sm text-red-400">{errors.user_email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                <textarea
                  name="message"
                  className={`w-full p-4 border rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message && touched.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-lime-500 focus:border-transparent'
                  }`}
                  rows={6}
                  placeholder="Tell me about your project..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {errors.message && touched.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
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
