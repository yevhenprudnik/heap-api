import { EntityService } from './entity.service.js';
import { TokenService } from './token.service.js';
import bcrypt from 'bcrypt';
export class AuthService {
  constructor(db, jwtAuth) {
    this.service = new EntityService(db, 'user');
    this.tokenService = new TokenService(jwtAuth);
  }

  async logIn(email, password) {
    const user = await this.service.getOne({ email });

    if (!user) {
      throw new Error('Wrong credentials');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error(`Wrong credentials`);
    }

    const tokens = this.tokenService.generateToken({
      email: user.email,
      username: user.username,
    });

    return { ...tokens, ...user };
  }

  async register(email, password, username) {
    const candidate = await this.service.getOneConditional({ email, username });

    if (candidate?.username === username) {
      throw new Error(
        `The user with username ${username} is already registered`
      );
    }

    if (candidate?.email === email) {
      throw new Error(`User with email ${email} is already registered`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await this.service.create({
      email,
      password: hashPassword,
      username,
    });
    const tokens = this.tokenService.generateToken({ email, username });

    return { ...tokens, ...user };
  }
}
