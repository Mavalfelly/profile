import { describe, it, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

describe('useScrollAnimation Hook', () => {
  it('returns elementRef and isVisible', () => {
    const { result } = renderHook(() => useScrollAnimation());
    
    expect(result.current).toHaveProperty('elementRef');
    expect(result.current).toHaveProperty('isVisible');
    expect(typeof result.current.isVisible).toBe('boolean');
  });

  it('accepts threshold option', () => {
    const { result } = renderHook(() => useScrollAnimation({ threshold: 0.5 }));
    
    expect(result.current).toHaveProperty('elementRef');
    expect(result.current).toHaveProperty('isVisible');
  });

  it('accepts rootMargin option', () => {
    const { result } = renderHook(() => useScrollAnimation({ rootMargin: '100px' }));
    
    expect(result.current).toHaveProperty('elementRef');
    expect(result.current).toHaveProperty('isVisible');
  });

  it('accepts once option', () => {
    const { result } = renderHook(() => useScrollAnimation({ once: false }));
    
    expect(result.current).toHaveProperty('elementRef');
    expect(result.current).toHaveProperty('isVisible');
  });

  it('initializes with isVisible false', () => {
    const { result } = renderHook(() => useScrollAnimation());
    
    expect(result.current.isVisible).toBe(false);
  });
});
