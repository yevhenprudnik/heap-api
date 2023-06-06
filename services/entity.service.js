export class EntityService {
  constructor(model) {
    this.model = model;
  }

  get queryBuilder() {
    return this.model.query();
  }

  async getOne(filter, relations = []) {
    const query = this.queryBuilder;

    relations.forEach(relation => query.withGraphFetched(relation));

    return query.findOne(filter);
  }

  async count(filter) {
    const query = this.queryBuilder;
    return query.where(filter).resultSize();
  }

  async search(filter, relations = [], sortBy = 'created_at') {
    const query = this.queryBuilder;

    relations.forEach(relation => query.withGraphFetched(relation));

    query.where(filter);

    query.orderBy(sortBy, 'desc');

    return query;
  }

  async create(payload) {
    return this.queryBuilder.insert(payload);
  }

  async update(id, payload) {
    return this.queryBuilder.patchAndFetchById(id, payload);
  }

  async deleteById(id) {
    return this.queryBuilder.deleteById(id);
  }

  resolveIsLiked(entities, uid) {
    entities.forEach(entity => {
      entity.isLiked = entity.likes?.some(like => like.authorId === uid);
    });
  }
}
