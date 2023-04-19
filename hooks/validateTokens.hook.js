import { EntityService } from '../services/entity.service.js';
import { TokenService } from '../services/token.service.js';

export class ValidateTokens {
  constructor(db, jwt) {
    this.service = new EntityService(db, 'user');
    this.tokenService = new TokenService(jwt);

    this.validateAccess = this.validateAccess.bind(this);
  }

  async validateAccess(request, reply) {
    const token = request.headers.authorization;
    try {
      if (!token) {
        throw new Error('Token not found');
      }

      const result = this.tokenService.validateAccessToken(token);

      if (!result) {
        throw new Error('Token is not valid');
      }

      const user = await this.service.getOne({ id: result.id });

      if (!user) {
        throw new Error('User not found');
      }

      request.user = user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
