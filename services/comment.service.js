import { Comment } from '../db/models/comment.js';
import { EntityService } from './entity.service.js';

export class CommentService extends EntityService {
  constructor() {
    super(Comment);
  }
}
