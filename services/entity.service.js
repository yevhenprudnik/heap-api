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

  async search(filter, relations = []) {
    const query = this.queryBuilder;

    relations.forEach(relation => query.withGraphFetched(relation));

    query.where(filter);

    const results = await query;

    const virtualFields = this.model.virtualAttributes;

    const resultsWithVirtualFields = results.map(result => {
      const resultWithVirtuals = { ...result };

      virtualFields.forEach(field => {
        console.log(result[field]);
        if (typeof result[field] !== 'undefined') {
          resultWithVirtuals[field] = result[field];
        }
      });

      return resultWithVirtuals;
    });

    return resultsWithVirtualFields;
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
