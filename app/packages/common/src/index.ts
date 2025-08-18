// Export all types
export * from './types';

// Export JWT middleware and guards
export { JwtMiddleware, JwtAuthGuard, JwtStrategy } from './middleware/jwt.middleware';

// Export utility functions
export const generateJwtToken = (payload: any, secret: string, expiresIn: string = '24h'): string => {
  const jwt = require('jsonwebtoken');
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyJwtToken = (token: string, secret: string): any => {
  const jwt = require('jsonwebtoken');
  return jwt.verify(token, secret);
};
