export class TokenService {
  constructor(jwtAuth) {
    this.jwtAuth = jwtAuth;
  }

  generateToken(payload) {
    const accessToken = this.jwtAuth.jwt.sign(payload, this.jwtAuth.accessKey, {
      expiresIn: '30m',
    });

    const refreshToken = this.jwtAuth.jwt.sign(
      payload,
      this.jwtAuth.refreshKey,
      {
        expiresIn: '30d',
      }
    );

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      return this.jwtAuth.jwt.verify(token, this.jwtAuth.accessKey);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return this.jwtAuth.jwt.verify(token, this.jwtAuth.refreshKey);
    } catch (error) {
      return null;
    }
  }
}
