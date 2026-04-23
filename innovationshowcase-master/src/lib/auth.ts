// src/lib/auth.ts
// Mocking authentication for the demo

export const auth = {
  async getSession() {
    return {
      user: {
        id: 'user-1',
        name: 'Adithya Shenoy',
        email: 'adithya@example.com',
        role: 'STUDENT',
      }
    };
  }
};

export const login = async () => ({ success: true });
export const logout = async () => ({ success: true });
export const register = async () => ({ success: true });
