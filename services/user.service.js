import { EntityService } from './entity.service.js';
export class UserService {
  constructor(db) {
    this.service = new EntityService(db, 'user');
  }

  async getUser(id) {
    const user = await this.service.getOne({ id });

    return user;
  }
}
