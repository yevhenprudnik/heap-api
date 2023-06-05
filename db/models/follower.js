import { Model } from 'objection';
import { User } from './user.js';

export class Follower extends Model {
  static get tableName() {
    return 'follower';
  }

  static get idColumn() {
    return ['authorId', 'userId'];
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'follower.authorId',
          to: 'user.id',
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'follower.userId',
          to: 'user.id',
        },
      },
    };
  }
}
