import { Model } from 'objection';
import { User } from './user.js';
import { Post } from './post.js';

export class Like extends Model {
  static get tableName() {
    return 'like';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'like.authorId',
          to: 'user.id',
        },
      },

      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'like.postId',
          to: 'post.id',
        },
      },
    };
  }
}
