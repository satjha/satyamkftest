import '@testing-library/jest-dom';

// Mock fetch globally for tests 
global.fetch = jest.fn();

// Mock import.meta.env for Vite environment variables 
(global as any).import = {
    meta: {
        env: {
            VITE_API_URL: 'https://api.example.com'
        }
    }
};