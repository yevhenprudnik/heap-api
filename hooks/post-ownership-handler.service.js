import { PostService } from '../services/post.service.js';
import { ApiError } from '../exceptions.js';

export class PostOwnershipChecker {
  constructor() {
    this.postService = new PostService();
  }

  usePostOwnership = async (request, reply) => {
    const { id } = request.params;

    if (
      typeof request?.user?.id === 'undefined' ||
      request?.user?.id === null
    ) {
      throw ApiError.Forbidden('No authorization provided.');
    }

    if (typeof id === 'undefined' || id === null) {
      throw ApiError.Forbidden('Invalid input format.');
    }

    const post = await this.postService.getOne({
      id,
      authorId: request.user.id,
    });

    if (typeof post === 'undefined' || post === null) {
      throw ApiError.Forbidden(
        'You do not have access to perform this action.'
      );
    }
  };
}
