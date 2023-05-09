import { Like } from '../db/models/like.js';
import { EntityService } from './entity.service.js';

export class LikeService extends EntityService {
  constructor() {
    super(Like);
  }

  async handleLike(authorId, entityId, entityType) {
    const key = entityType + 'Id';

    const isLiked = await this.getOne({
      authorId,
      [key]: entityId,
      type: entityType,
    });

    if (isLiked) {
      const removed = await this.deleteById(isLiked.id);

      return { removed: !!removed };
    }

    const like = await this.create({
      authorId,
      [key]: entityId,
      type: entityType,
    });

    return { added: !!like.id };
  }
}
