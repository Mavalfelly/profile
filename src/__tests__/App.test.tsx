import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders main navigation', () => {
    render(<App />);
    const nav = document.querySelector('nav');
    expect(nav).not.toBeNull();
  });

  it('renders landing page section', () => {
    render(<App />);
    const heading = screen.getAllByText(/Matthew Feliciano/i)[0];
    expect(heading).not.toBeNull();
  });

  it('renders about me section', () => {
    render(<App />);
    const aboutSection = document.querySelector('#about_me');
    expect(aboutSection).not.toBeNull();
  });

  it('renders projects section', () => {
    render(<App />);
    const projectSection = document.querySelector('#project-showcase');
    expect(projectSection).not.toBeNull();
  });

  it('renders contact section', () => {
    render(<App />);
    const contactSection = document.querySelector('#contact_me');
    expect(contactSection).not.toBeNull();
  });

  it('renders career history section', () => {
    render(<App />);
    const careerSection = document.querySelector('#career_history');
    expect(careerSection).not.toBeNull();
  });
});
