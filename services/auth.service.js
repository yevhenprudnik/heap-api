import { EntityService } from './entity.service.js';

export class AuthService {
  constructor(db) {
    this.service = new EntityService(db, 'user');
  }

  async logIn(email, password) {
    const user = await this.service.getOne({ email, password });

    if (!user) {
      throw new Error('Wrong credentials');
    }

    return user;
  }
}
