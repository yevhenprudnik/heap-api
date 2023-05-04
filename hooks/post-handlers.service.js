import { PostService } from '../services/post.service.js';
import { ApiError } from '../exceptions.js';

export class PostOwnershipChecker {
  constructor() {
    this.postService = new PostService();
  }

  usePostOwnership = async (request, reply) => {
    const { id } = request.params;

    if (typeof id === 'undefined' || typeof request?.user?.id === 'undefined') {
      throw new ApiError(403, 'Forbidden');
    }

    const post = await this.postService.getOne({
      id,
      authorId: request.user.id,
    });

    if (typeof post === 'undefined' || post === null) {
      throw new ApiError(403, 'Forbidden');
    }
  };
}
