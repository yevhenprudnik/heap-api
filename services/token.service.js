import { ApiError } from '../exceptions.js';

export class TokenService {
  constructor(jwt) {
    this.jwt = jwt;
  }

  generateTokens(payload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  generateAccessToken(payload) {
    return this.jwt.sign(
      { type: 'access', ...payload },
      {
        expiresIn: '30m',
      }
    );
  }

  generateRefreshToken(payload) {
    return this.jwt.sign(
      { type: 'refresh', ...payload },
      {
        expiresIn: '30d',
      }
    );
  }

  validateTokens(types, tokens) {
    let accessTokenPayload;
    let refreshTokenPayload;

    if (types.includes('access')) {
      accessTokenPayload = this.validateToken(tokens.accessToken, 'access');
    }

    if (types.includes('refresh')) {
      refreshTokenPayload = this.validateToken(tokens.refreshToken, 'refresh');
    }

    return { ...accessTokenPayload, ...refreshTokenPayload };
  }

  validateToken(token, type) {
    const result = this.jwt.verify(token);

    if (result.type !== type) {
      throw ApiError.Unauthorized();
    }

    return result;
  }
}
