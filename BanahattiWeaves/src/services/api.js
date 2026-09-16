// Mock API service layer structured for future Spring Boot REST API + JWT integration

const API_BASE_URL = 'http://localhost:8080/api';

export const apiService = {
  // Auth endpoints
  async login(email, password) {
    // Simulated JWT Auth response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@banahattiweaves.com' && password === 'admin123') {
          resolve({
            token: 'mock-jwt-token-admin-998877',
            user: {
              id: 'user-admin-1',
              name: 'Banahatti Administrator',
              email: 'admin@banahattiweaves.com',
              phone: '+91 99000 88776',
              role: 'ADMIN'
            }
          });
        } else if (email && password.length >= 4) {
          resolve({
            token: 'mock-jwt-token-user-112233',
            user: {
              id: `user-${Date.now()}`,
              name: email.split('@')[0].toUpperCase(),
              email: email,
              phone: '+91 98765 43210',
              role: 'USER'
            }
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 300);
    });
  },

  async register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: `mock-jwt-token-${Date.now()}`,
          user: {
            id: `user-${Date.now()}`,
            name: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            role: 'USER'
          }
        });
      }, 300);
    });
  }
};
