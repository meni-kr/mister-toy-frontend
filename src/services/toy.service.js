
import { asyncStorageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"


const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    
}

_createToys()

function query() {
    return asyncStorageService.query(STORAGE_KEY)
        .then(toys => toys)
}

function getById(toyId) {
    return asyncStorageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return asyncStorageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return asyncStorageService.put(STORAGE_KEY, toy)
    } else {  
        return asyncStorageService.post(STORAGE_KEY, toy)
    }
}




function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        desc: '',
        inStock: true,
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Race Car',100))
        toys.push(_createToy('Doll',20))
        toys.push(_createToy('Ball',30))
        toys.push(_createToy('Lego set',150))
        utilService.saveToStorage(STORAGE_KEY, toys)
    }

}

function _createToy(name, price) {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()
    toy.name = name
    toy.price = +price
    toy.labels.push(_getRandomLabel())
    toy.creatAt = Date.now()
    toy.desc = utilService.makeLorem(10)
    toy.inStock= (Math.random()>0.5)? true : false
    return toy
}

function _getRandomLabel() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
        const num = utilService.getRandomIntInclusive(0,7)

        return labels[num]


}