import { Model } from 'objection';
import { User } from './user.js';
import { Like } from './like.js';
import { Comment } from './comment.js';

export class Post extends Model {
  static get tableName() {
    return 'post';
  }

  // static query(...args) {
  //   return super.query(...args).onBuildKnex(knexQueryBuilder => {
  //     knexQueryBuilder.on('query', queryData => {
  //       console.log(queryData);
  //     });
  //   });
  // }

  static get relationMappings() {
    return {
      author: {
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
        cascadeDelete: true,
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'post.id',
          to: 'comment.postId',
        },
        cascadeDelete: true,
      },
    };
  }
}
