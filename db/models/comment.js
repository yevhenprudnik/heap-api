import { Model } from 'objection';
import { User } from './user.js';
import { Post } from './post.js';

export class Comment extends Model {
  static get tableName() {
    return 'comment';
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comment.authorId',
          to: 'user.id',
        },
      },

      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'comment.postId',
          to: 'post.id',
        },
      },
    };
  }
}
