import '@testing-library/jest-dom';

//Mock import.meta.env
(global as any).importMeta = { env: {} };
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_ANALYTICS_API: 'http://localhost:3001/api',
        VITE_EMAILJS_SERVICE_ID: 'test_service',
        VITE_EMAILJS_TEMPLATE_ID: 'test_template',
        VITE_EMAILJS_PUBLIC_KEY: 'test_key',
      },
    },
  },
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

(global as any).IntersectionObserver = MockIntersectionObserver;

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: Record<string, any>): R;
      toBeDisabled(): R;
    }
  }
}

