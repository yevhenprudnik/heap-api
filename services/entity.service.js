export class EntityService {
  constructor(db, alias) {
    this.db = db;
    this.alias = alias;
  }

  async getOne(filter) {
    return this.db(this.alias).where(filter).first();
  }

  async create(payload) {
    return this.db(this.alias).insert(payload).returning('id');
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

  async deleteById(id) {
    const result = await this.db(this.alias).where({ id }).del();

    return result > 0;
  }

  async update(id, payload) {
    return this.db(this.alias).where({ id }).update(payload);
  }

  async join(filter, joinParameters, selectParameters) {
    return this.db(this.alias)
      .select(...selectParameters)
      .where(...filter)
      .innerJoin(...joinParameters);
  }
}
