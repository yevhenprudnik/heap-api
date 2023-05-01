import { PostService } from '../services/post.service.js';

export class PostOwnershipChecker {
  constructor() {
    this.postService = new PostService();
  }

  checkPostOwnership = async (request, reply) => {
    const { id } = request.body;
    const post = await this.postService.getOne({ id });
    if (post.authorId !== request.user.id) {
      throw new Error('you cannot edit posts that are not your own');
    }
  };
}
