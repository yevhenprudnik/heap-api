export class EntityService {
  constructor(db, alias) {
    this.db = db;
    this.alias = alias;
  }

  async getOne(filter) {
    return this.db(this.alias).where(filter).first();
  }

  async create(payload) {
    return this.alias.insert(payload);
  }

  async getOneConditional(filter) {
    const query = this.db(this.alias);

    for (const key in filter) {
      query.orWhere(key, filter[key]);
    }
    return query.first();
  }

  async getMany(filter) {
    return this.db(this.alias).where(filter);
  }

  async delete(id) {
    return this.db(this.alias).del().where({id});
  }

  async update(id, payload) {
    return this.db(this.alias).where({ id }).update(payload);
  }
}
