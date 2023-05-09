import { Model } from 'objection';
import { User } from './user.js';
import { Post } from './post.js';
import { Comment } from './comment.js';

export class Like extends Model {
  static get tableName() {
    return 'like';
  }

  static get relationMappings() {
    return {
      author: {
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

      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: 'like.commentId',
          to: 'comment.id',
        },
      },
    };
  }
}
