
class Db {
  constructor() {
    this.data = { drones: {} }
    this.save = this.save.bind(this)
    this.getAll = this.getAll.bind(this)
  }

  /**
   * Save an entity object in database
   * @param {string} collection Database colloction name
   * @param {object} entity The object that should be saved in database
   */
  save(collection, entity) {
    if (!entity.id) {
      throw Error('The enitiy must have "id" field.')
    }
    this.data = {
      ...this.data,
      [collection]:
      { ...this.data.drones, [entity.id]: { ...entity } },
    }
  }

  /**
   * Get all entities from a collection
   * @param {string} collection Database colloction name
   */
  getAll(collection) {
    return { ...this.data[collection] }
  }
}

export default Db
