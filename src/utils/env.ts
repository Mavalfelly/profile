export const getEnv = (key: string, defaultValue = ''): string => {
  try {
    const metaEnv = (globalThis as any).import?.meta?.env;
    if (metaEnv && metaEnv[key]) {
      return metaEnv[key];
    }
  } catch (e) {
    // import.meta not available
  }
  
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  return defaultValue;
};
