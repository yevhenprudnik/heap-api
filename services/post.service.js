import { Post } from '../db/models/post.js';
import { EntityService } from './entity.service.js';

export class PostService extends EntityService {
  constructor() {
    super(Post);
  }

  async search(filter, relations = [], uid) {
    const posts = await super.search(filter, relations, {
      field: 'created_at',
      order: 'desc',
    });

    super.resolveIsLiked(posts, uid);

    return posts;
  }

  async getOne(filter, relations = [], uid) {
    const post = await super.getOne(filter, relations);

    super.resolveIsLiked([post], uid);

    return post;
  }
}
