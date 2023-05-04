import { PostService } from '../services/post.service.js';

export class PostOwnershipChecker {
  constructor() {
    this.postService = new PostService();
  }

  usePostOwnership = async (request, reply) => {
    const { id } = request.params;
    const post = await this.postService.getOne({ id });

    if(!post) {
      throw new Error(`No post found, id = ${id}`);
    }

    if (post.authorId !== request.user.id) {
      throw new Error('You cannot edit posts that are not your own');
    }
  };
}
