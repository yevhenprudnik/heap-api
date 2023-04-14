export class EntityService {
  constructor(model) {
    this.model = model;
  }

  async getOne(filter) {
    return this.model.query().where(filter);
  }

  async create(payload) {
    return this.model.query().insert(payload);
  }

  async deleteById(id) {
    return this.model.query().deleteById(id);
  }

  async update(id, payload) {
    return this.model.query().patchAndFetchById(id, payload);
  }
}
