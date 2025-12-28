import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { trackPageView, trackFormSubmission, trackDownload, trackProjectView } from '../../utils/analytics';

const mockFetch = jest.fn<typeof fetch>();
global.fetch = mockFetch as typeof fetch;

describe('Analytics Utilities', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockResolvedValue({ ok: true } as Response);
    localStorage.clear();
  });

  it('trackPageView sends correct data', async () => {
    await trackPageView('/');
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/track/pageview'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('visitorId'),
      })
    );
  });

  it('trackFormSubmission sends success status', async () => {
    await trackFormSubmission('contact_form', true);
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/track/form'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('contact_form'),
      })
    );
  });

  it('trackDownload sends file name', async () => {
    await trackDownload('resume.pdf');
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/track/download'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('resume.pdf'),
      })
    );
  });

  it('trackProjectView sends project name', async () => {
    await trackProjectView('Project Name');
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/track/project'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('Project Name'),
      })
    );
  });

  it('generates and persists visitor ID', async () => {
    await trackPageView('/');
    
    const visitorId = localStorage.getItem('visitor_id');
    expect(visitorId).toBeTruthy();
    expect(visitorId).toMatch(/^visitor_/);
  });

  it('reuses existing visitor ID', async () => {
    await trackPageView('/');
    const firstId = localStorage.getItem('visitor_id');
    
    await trackPageView('/about');
    const secondId = localStorage.getItem('visitor_id');
    
    expect(firstId).toBe(secondId);
  });

  it('handles fetch errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockRejectedValue(new Error('Network error') as never);
    
    await trackPageView('/');
    
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
