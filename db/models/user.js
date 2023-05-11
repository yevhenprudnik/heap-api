import { Model } from 'objection';
import { Post } from './post.js';

export class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'user.id',
          to: 'post.authorId',
        },
        cascadeDelete: true,
      },
    };
  }
}
