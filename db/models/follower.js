import { Model } from 'objection';
import { User } from './user.js';

export class Follower extends Model {
  static get tableName() {
    return 'follower';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'follower.user_id',
          to: 'user.id',
        },
      },
      account: {
        relation: Model.BelongsToManyRelation,
        modelClass: User,
        join: {
          from: 'follower.account_id',
          to: 'user.id',
        },
      },
    };
  }
}