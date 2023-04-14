import { Post } from '../db/models/post.js';
import { EntityService } from './entity.service.js';

export class PostService extends EntityService {
  constructor() {
    super(Post);
  }

  async getPostsByUserId(authorId) {
    const posts = await Post.query()
      .where({ authorId })
      .withGraphFetched('user');

    return posts;
  }
}
