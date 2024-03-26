
import { asyncStorageService } from "./async-storage.service.js"


const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getEmptyToy,
}

function query() {
    return asyncStorageService.query(STORAGE_KEY)
        .then(toys => toys)
}




function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        desc:'',
        inStock: true,
        }
}

