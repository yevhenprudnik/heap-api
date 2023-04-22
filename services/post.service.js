import { Post } from '../db/models/post.js';
import { EntityService } from './entity.service.js';

export class PostService extends EntityService {
  constructor() {
    super(Post);
  }
}
