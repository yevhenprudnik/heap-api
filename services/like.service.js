import { Like } from '../db/models/like.js';
import { EntityService } from './entity.service.js';

export class LikeService extends EntityService {
  constructor() {
    super(Like);
  }
}
