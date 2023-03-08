import { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH } from '../environment.js';

export class TokenService {
  constructor(jwt) {
    this.jwt = jwt;
  }

  generateToken(payload) {
    const acsessToken = this.jwt.sign(payload, SECRET_KEY_ACCESS, {
      expiresIn: '30m',
    });
    const refreshToken = this.jwt.sign(payload, SECRET_KEY_REFRESH, {
      expiresIn: '30',
    });
    return { acsessToken, refreshToken };
  }

  validateAcsessToken(token) {
    try {
      return this.jwt.verify(token, JWT_ACCESS_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return this.jwt.verify(token, JWT_REFRESH_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }
}
