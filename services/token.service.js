export class TokenService {
  constructor(jwt) {
    this.jwt = jwt;
  }

  generateTokens(payload) {
    const accessToken = this.jwt.sign(payload, this.jwt.accessKey, {
      expiresIn: '30m',
    });

    const refreshToken = this.jwt.sign(payload, this.jwt.refreshKey, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      return this.jwt.verify(token, this.jwt.accessKey);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return this.jwt.verify(token, this.jwt.refreshKey);
    } catch (error) {
      return null;
    }
  }
}
