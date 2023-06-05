import { Comment } from '../db/models/comment.js';
import { EntityService } from './entity.service.js';

export class CommentService extends EntityService {
  constructor() {
    super(Comment);
  }

  async search(filter, relations = [], uid) {
    const comments = await super.search(filter, relations);

    super.resolveIsLiked(comments, uid);

    return comments;
  }

  async getOne(filter, relations = [], uid) {
    const comment = await super.getOne(filter, relations);

    super.resolveIsLiked([comment], uid);

    return comment;
  }
}
