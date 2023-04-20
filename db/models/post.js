import { Model } from 'objection';
import { User } from './user.js';
import { Like } from './like.js';

export class Post extends Model {
  static get tableName() {
    return 'post';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'post.authorId',
          to: 'user.id',
        },
      },

      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: 'post.id',
          to: 'like.postId',
        },
      },
    };
  }
}
