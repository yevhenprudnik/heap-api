import { EntityService } from './entity.service.js';

export class PostService {
  constructor(db) {
    this.service = new EntityService(db, 'post');
  }

  async createPost(content, authorId) {
    const post = await this.service.create({ content, authorId });
    if (!post) {
      throw new Error('Post creation error ');
    }
    return post.id;
  }

  async getPost(id) {
    const post = this.service.getOne(postId);
    if (!post) {
      throw new Error('Invalid id');
    }
    return post;
  }

  async deletePost(id) {
    try {
      await this.service.delete(id);
    } catch (err) {
      console.error(err);
    }
  }

  async updatePost(id, updatedPost) {
    const newPost = await this.service.update(id, updatedPost);
    if(!newPost) {
      throw new Error('Post update error');
    }
    return result;
  }
}
