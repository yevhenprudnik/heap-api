import { Model } from 'objection';
import { Post } from './post.js';
import { Follower } from './follower.js';

export class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get virtualAttributes() {
    return ['followersCount', 'followsCount'];
  }

  static get followersCount() {
    return this.followers ? this.followers.length : 0;
  }

  static get followingsCount() {
    return this.followings ? this.followings.length : 0;
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
      followings: {
        relation: Model.HasManyRelation,
        modelClass: Follower,
        join: {
          from: 'user.id',
          to: 'follower.userId',
        },
        cascadeDelete: true,
      },

      followers: {
        relation: Model.HasManyRelation,
        modelClass: Follower,
        join: {
          from: 'user.id',
          to: 'follower.authorId',
        },
        cascadeDelete: true,
      },
    };
  }
}
