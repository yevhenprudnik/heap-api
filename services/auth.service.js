import bcrypt from 'bcrypt';
import { UserService } from './user.service.js';
import { TokenService } from './token.service.js';
export class AuthService {
  constructor(jwt) {
    this.userService = new UserService();
    this.tokenService = new TokenService(jwt);
  }

  async signUp(definition) {
    const { email, password, username } = definition;

    const candidate = await this.userService.getOne(builder =>
      builder.where({ email }).orWhere({ username })
    );

    if (candidate?.username === username) {
      throw new Error(
        `The user with username ${username} is already registered`
      );
    }

    if (candidate?.email === email) {
      throw new Error(`User with email ${email} is already registered`);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await this.userService.create({
      email,
      password: hashPassword,
      username,
    });

    return this.tokenService.generateTokens({ id: user.id });
  }

  async signIn(definition) {
    const { email, password } = definition;

    const user = await this.userService.getOne({ email });

    if (!user) {
      throw new Error('Wrong credentials');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error(`Wrong credentials`);
    }

    return this.tokenService.generateTokens({ id: user.id });
  }

  async refresh(user) {
    return this.tokenService.generateTokens({ id: user.id });
  }
}
