import { ApiError } from '../exceptions.js';
import { CommentService } from '../services/comment.service.js';

export class CommentOwnershipChecker {
  constructor() {
    this.commentService = new CommentService();
  }

  useCommentOwnership = async (request, reply) => {
    const { id } = request.params;

    if (typeof id === 'undefined' || typeof request?.user?.id === 'undefined') {
      throw new ApiError(403, 'Forbidden');
    }

    const comment = await this.commentService.getOne({
      id,
      authorId: request.user.id,
    });

    if (typeof comment === 'undefined' || comment === null) {
      throw new ApiError(403, 'Forbidden');
    }
  };
}
