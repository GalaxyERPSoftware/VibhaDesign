// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://api.vvdesign.in'  // Production URL
    : 'http://localhost:5000'; // Development URL 