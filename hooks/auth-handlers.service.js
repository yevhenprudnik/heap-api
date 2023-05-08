import { TokenService } from '../services/token.service.js';
import { UserService } from '../services/user.service.js';
import { ApiError } from '../exceptions.js';

export class AuthHandlersService {
  constructor(jwt) {
    this.tokenService = new TokenService(jwt);
    this.userService = new UserService();
  }

  useTokenAuth = tokenTypes => async (request, reply) => {
    try {
      const authHeaders = request.headers.authorization;

      if (!authHeaders) {
        throw ApiError.Unauthorized();
      }

      const [type, accessToken, refreshToken] = authHeaders.split(' ');

      if (type !== 'Bearer' || (!accessToken && !refreshToken)) {
        throw ApiError.Unauthorized();
      }

      const data = this.tokenService.validateTokens(tokenTypes, {
        accessToken,
        refreshToken,
      });

      if (!data) {
        throw ApiError.Unauthorized();
      }

      const user = await this.userService.getOne({ id: data.id });

      if (!user) {
        throw ApiError.Unauthorized();
      }

      request.user = user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.Unauthorized();
    }
  };
}
