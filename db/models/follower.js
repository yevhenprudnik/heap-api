import { Model } from 'objection';
import { User } from './user.js';

export class Follower extends Model {
  static get tableName() {
    return 'follower';
  }

  static get idColumn() {
    return ['authorId', 'userId'];
  }

  static get virtualAttributes() {
    return ['followerCount', 'followCount'];
  }

  get followerCount() {
    return this.user ? this.user.length : 0;
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
        relation: Model.BelongsToManyRelation,
        modelClass: User,
        join: {
          from: 'follower.userId',
          through: {
            from: 'follower.userId',
            to: 'follower.authorId',
          },
          to: 'user.id',
        },
      },
    };
  }
}
