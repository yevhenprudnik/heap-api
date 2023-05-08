import { Follower } from '../db/models/follower.js';
import { EntityService } from './entity.service.js';

export class FollowerService extends EntityService {
  constructor() {
    super(Follower);
  }

  async follow(payload) {
    if (payload.userId === payload.accountId) {
      throw new Error(400, 'You cannot follow yourself.');
    }

    const result = await Follower.query()
      .insert(payload)
      .onConflict(['userId', 'accountId'])
      .merge();
    return result;
  }

  async unfollow(payload) {
    const result = await Follower.query().delete().where(payload);
    
    return result;
  }
}
