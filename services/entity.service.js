export class EntityService {
  constructor(model) {
    this.model = model;
  }

  get queryBuilder() {
    return this.model.query();
  }

  async getOne(filter) {
    return this.queryBuilder.findOne(filter);
  }

  async search(filter, relations = []) {
    const query = this.queryBuilder;

    relations.forEach(relation => query.withGraphFetched(relation));

    query.where(filter);

    return query;
  }

  async create(payload) {
    return this.queryBuilder.insert(payload);
  }

  async deleteById(id) {
    return this.queryBuilder.deleteById(id);
  }

  async update(id, payload) {
    return this.queryBuilder.patchAndFetchById(id, payload);
  }
}
