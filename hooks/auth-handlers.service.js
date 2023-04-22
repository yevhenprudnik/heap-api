import { TokenService } from '../services/token.service.js';
import { UserService } from '../services/user.service.js';

export class AuthHandlersService {
  constructor(jwt) {
    this.tokenService = new TokenService(jwt);
    this.userService = new UserService();
  }

  useTokenAuth = tokenTypes => async (request, reply) => {
    try {
      const authHeaders = request.headers.authorization;

      if (!authHeaders) {
        throw new Error('Unauthorized');
      }

      const [type, accessToken, refreshToken] = authHeaders.split(' ');

      if (type !== 'Bearer' || (!accessToken && !refreshToken)) {
        throw new Error('Unauthorized');
      }

      const data = this.tokenService.validateTokens(tokenTypes, {
        accessToken,
        refreshToken,
      });

      if (!data) {
        throw new Error('Unauthorized');
      }

      const user = await this.userService.getOne({ id: data.id });

      if (!user) {
        throw new Error('Unauthorized');
      }

      request.user = user;
    } catch {
      throw new Error('Unauthorized');
    }
  };
}
