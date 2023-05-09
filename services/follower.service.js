import { Follower } from '../db/models/follower.js';
import { ApiError } from '../exceptions.js';
import { EntityService } from './entity.service.js';

export class FollowerService extends EntityService {
  constructor() {
    super(Follower);
  }

  async follow(authorId, userId) {
    if (userId === authorId) {
      throw ApiError.BadRequest('You cannot follow yourself.');
    }

    return Follower.query()
      .insert({ userId, authorId })
      .onConflict(['authorId', 'userId'])
      .merge();
  }
}
