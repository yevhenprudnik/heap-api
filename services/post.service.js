import { EntityService } from './entity.service.js';

export class PostService {
  constructor(db) {
    this.service = new EntityService(db, 'post');
  }

  async createPost(content, authorId) {
    const id = await this.service.create({ content, authorId });

    return { id, content, authorId };
  }

  async getPost(id) {
    return this.service.getOne(id);
  }

  async deletePost(id) {
    return this.service.deleteById(id);
  }

  async updatePost(id, updatedPost) {
    return this.service.update(id, updatedPost);
  }

  async getPostByAuthorId(authorId) {
    return this.service.join(
      ['post.authorId', authorId],
      ['user', 'user.id', 'post.authorId'],
      ['user.username', 'post.content']
    );
  }
}
