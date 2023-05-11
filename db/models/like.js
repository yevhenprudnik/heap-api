import { Model } from 'objection';
import { User } from './user.js';

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
    };
  }
}
