import Db from 'data/db'

describe('The Database instance', () => {

    const db = new Db()
    const collection = 'drone'
    const drone = { id: "621e8b98-5732-45af-949e-a11eb9663f23", lt: 36.44455640945829, lg: 52.84810935118595, speed: 10 }
    const droneWithoutId = { lt: 36.44455640945829, lg: 52.84810935118595, speed: 10 }

    it('Empty database must return empty object `{}`.', () => {

        expect(db.getAll(collection)).toEqual({})
    })

    it('Must throw  error in the case the entity does not have id .', () => {
        expect(() => db.save(collection, droneWithoutId))
            .toThrow();
    })
    
    it('Must not throw  error when we save a valid entity.', () => {
        expect(() => db.save(collection, drone))
            .not
            .toThrow();
    })

    it('Must return the same data saved in data base return the .', () => {
        expect(db.getAll(collection)).toEqual({ [drone.id]: drone })
    })
})