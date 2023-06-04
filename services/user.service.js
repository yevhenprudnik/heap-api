import { User } from '../db/models/user.js';
import { EntityService } from './entity.service.js';
import { FollowService } from './follow.service.js';


export class UserService extends EntityService {
  constructor() {
    super(User);
    this.followService = new FollowService();
  }

  async getFollowersCount(userId) {
    return this.followService.count({userId});
  }

  async getFollowsCount(authorId) {
    return this.followService.count({authorId});
  }
}
