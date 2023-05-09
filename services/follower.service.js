import { Follower } from '../db/models/follower.js';
import { ApiError } from '../exceptions.js';
import { EntityService } from './entity.service.js';

export class FollowerService extends EntityService {
  constructor() {
    super(Follower);
  }

  async follow(payload) {
    if (payload.userId === payload.accountId) {
      throw ApiError.BadRequest('You cannot follow yourself.');
    }

    return Follower.query()
      .insert(payload)
      .onConflict(['authorId', 'userId'])
      .merge();
  }
}
