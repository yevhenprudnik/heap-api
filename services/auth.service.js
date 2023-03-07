import { EntityService } from './entity.service.js';
import bcrypt from 'bcrypt';
export class AuthService {
  constructor(db) {
    this.service = new EntityService(db, 'user');
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

    return user;
  }

  async register(email, password, username) {
    const user = await this.service.getOneConditional({ email, username });

    if (user?.username === username) {
      throw new Error(
        `The user with username ${username} is already registered`
      );
    }

    if (user?.email === email) {
      throw new Error(`User with email ${email} is already registered`);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    return this.service.create({ email, password: hashPassword, username });
  }
}
