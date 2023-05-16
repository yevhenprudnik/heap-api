import { Model } from 'objection';
import { User } from './user.js';
import { Post } from './post.js';
import { Like } from './like.js';

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

      replies: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'comment.id',
          to: 'comment.commentId',
        },
        cascadeDelete: true,
      },

      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: 'comment.id',
          to: 'like.commentId',
        },
        cascadeDelete: true,
      },
    };
  }
}
