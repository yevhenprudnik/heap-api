import { EntityService } from '../services/entity.service.js';
import { TokenService } from '../services/token.service.js';

export class ValidateTokens {
  constructor(db, jwt) {
    this.service = new EntityService(db, 'user');
    this.tokenService = new TokenService(jwt);

    this.validateRefresh = this.validateRefresh.bind(this);
  }

  async validateRefresh(request, reply) {
    try {
      const token = request.cookies.RefreshToken;

      if (!token) {
        return 'Token not found';
      }

      const result = this.tokenService.validateRefreshToken(token);

      if (!result) {
        return 'Token is not valid';
      }

      const user = await this.service.getOne({ email: result.email });

      if (!user) {
        return 'User not found';
      }

      request.user = user;
    } catch (err) {
      return 'err';
    }
  }
}
