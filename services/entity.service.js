export class EntityService {
  constructor(db, alias) {
    this.db = db;
    this.alias = alias;
  }

  async getOne(filter) {
    return this.db(this.alias).where(filter).first();
  }

  async getMany(filter) {
    return this.db(this.alias).where(filter);
  }
}
