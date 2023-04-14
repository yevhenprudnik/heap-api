import { User } from '../db/models/user.js';
import { EntityService } from './entity.service.js';

export class UserService extends EntityService {
  constructor() {
    super(User);
  }

  async getById(id) {
    return User.query().findById(id);
  }

  async search(filter) {
    return User.query().where(filter);
  }
}
