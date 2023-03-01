import { EntityService } from './entity.service.js';

export class PostService {
  constructor(db) {
    this.service = new EntityService(db, 'posts');
  }

  async createPost(content, authorId) {
    return this.service.create({ content, authorId });
  }

  async getPost(id) {
    return this.service.getOne(postId);
  }

  async deletePost(id) {
    return this.service.deleteById(id);
  }

  async updatePost(id, updatedPost) {
    return this.service.update(id, updatedPost);
  }
}
