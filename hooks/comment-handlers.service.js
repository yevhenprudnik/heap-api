import { ApiError } from '../exceptions.js';
import { CommentService } from '../services/comment.service.js';

export class CommentOwnershipChecker {
  constructor() {
    this.commentService = new CommentService();
  }

  useCommentOwnership = async (request, reply) => {
    const { id } = request.params;

    if (typeof request?.user?.id === 'undefined' || request?.user?.id === null) {
      throw ApiError.Forbidden('No authorization provided.');
    }

    if (typeof id === 'undefined' || id === null) {
      throw ApiError.Forbidden('Invalid input format.');
    }

    const comment = await this.commentService.getOne({
      id,
      authorId: request.user.id,
    });

    if (typeof comment === 'undefined' || comment === null) {
      throw ApiError.Forbidden(
        'You do not have access to perform this action.'
      );
    }
  };
}
