import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';

describe('AnimatedSection Component', () => {
  it('renders children', () => {
    render(
      <AnimatedSection animation="fade-up">
        <div>Test Content</div>
      </AnimatedSection>
    );
    
    const content = screen.queryByText('Test Content');
    expect(content).not.toBeNull();
  });

  it('applies fade-up animation class', () => {
    const { container } = render(
      <AnimatedSection animation="fade-up">
        <div>Test</div>
      </AnimatedSection>
    );
    
    const section = container.querySelector('.animated-section');
    expect(section?.classList.contains('fade-up')).toBe(true);
  });

  it('applies fade-down animation class', () => {
    const { container } = render(
      <AnimatedSection animation="fade-down">
        <div>Test</div>
      </AnimatedSection>
    );
    
    const section = container.querySelector('.animated-section');
    expect(section?.classList.contains('fade-down')).toBe(true);
  });

  it('applies fade-left animation class', () => {
    const { container } = render(
      <AnimatedSection animation="fade-left">
        <div>Test</div>
      </AnimatedSection>
    );
    
    const section = container.querySelector('.animated-section');
    expect(section?.classList.contains('fade-left')).toBe(true);
  });

  it('applies fade-right animation class', () => {
    const { container } = render(
      <AnimatedSection animation="fade-right">
        <div>Test</div>
      </AnimatedSection>
    );
    
    const section = container.querySelector('.animated-section');
    expect(section?.classList.contains('fade-right')).toBe(true);
  });

  it('applies scale animation class', () => {
    const { container } = render(
      <AnimatedSection animation="scale">
        <div>Test</div>
      </AnimatedSection>
    );
    
    const section = container.querySelector('.animated-section');
    expect(section?.classList.contains('scale')).toBe(true);
  });

  it('applies custom delay', () => {
    const { container } = render(
      <AnimatedSection animation="fade-up" delay={500}>
        <div>Test</div>
      </AnimatedSection>
    );
    
    const section = container.querySelector('.animated-section') as HTMLElement;
    expect(section?.style.transitionDelay).toBe('500ms');
  });
});
