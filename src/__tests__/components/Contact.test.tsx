import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ContactUs } from '../../components/Contact/Contact';

const mockSendForm = jest.fn();

jest.mock('@emailjs/browser', () => ({
  sendForm: (...args: unknown[]) => mockSendForm(...args),
}));

jest.mock('../../utils/analytics', () => ({
  trackFormSubmission: jest.fn(),
}));

describe('Contact Form Component', () => {
  beforeEach(() => {
    mockSendForm.mockClear();
  });

  it('renders contact form', () => {
    render(<ContactUs />);
    const heading = screen.queryByText(/Get In Touch/i);
    expect(heading).not.toBeNull();
  });

  it('shows validation error for empty name', async () => {
    render(<ContactUs />);
    const nameInput = screen.getByPlaceholderText(/Your name/i);
    
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      const error = screen.queryByText(/Name is required/i);
      expect(error).not.toBeNull();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<ContactUs />);
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i);
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      const error = screen.queryByText(/Please enter a valid email address/i);
      expect(error).not.toBeNull();
    });
  });

  it('validates name length requirements', async () => {
    render(<ContactUs />);
    const nameInput = screen.getByPlaceholderText(/Your name/i);
    
    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      const error = screen.queryByText(/Name must be at least 2 characters/i);
      expect(error).not.toBeNull();
    });
  });

  it('submits form with valid data', async () => {
    mockSendForm.mockResolvedValue({ text: 'OK' } as never);
    
    render(<ContactUs />);
    
    const nameInput = screen.getByPlaceholderText(/Your name/i);
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i);
    const messageInput = screen.getByPlaceholderText(/Tell me about your project.../i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message for the contact form.' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSendForm).toHaveBeenCalled();
    });
  });

  it('disables submit button while loading', async () => {
    mockSendForm.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<ContactUs />);
    
    const nameInput = screen.getByPlaceholderText(/Your name/i);
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i);
    const messageInput = screen.getByPlaceholderText(/Tell me about your project.../i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });
    
    fireEvent.click(submitButton);
    
    expect(submitButton.hasAttribute('disabled')).toBe(true);
  });
});
