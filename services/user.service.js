import { User } from '../db/models/user.js';
import { EntityService } from './entity.service.js';

export class UserService extends EntityService {
  constructor() {
    super(User);
  }
}
