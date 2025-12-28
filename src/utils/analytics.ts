const ANALYTICS_API = import.meta.env.VITE_ANALYTICS_API || 'http://localhost:3001/api';

// Generate or retrieve visitor ID
const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

// Generic tracking function
const sendAnalytics = async (endpoint: string, data: any) => {
  try {
    await fetch(`${ANALYTICS_API}/track/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

export const trackPageView = (page: string) => {
  sendAnalytics('pageview', {
    page,
    visitorId: getVisitorId(),
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  sendAnalytics('form', {
    formName,
    success,
  });
};

export const trackProjectView = (projectName: string) => {
  sendAnalytics('project', {
    projectName,
  });
};

export const trackDownload = (fileName: string) => {
  sendAnalytics('download', {
    fileName,
  });
};
