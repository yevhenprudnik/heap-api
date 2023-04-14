import { Model } from 'objection';
import { User } from './user.js';


export class Post extends Model {
  static get tableName() {
    return 'post';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter: query => query.select('username'),
        join: {
          from: 'post.authorId',
          to: 'user.id',
        },
      },
    };
  }
}
