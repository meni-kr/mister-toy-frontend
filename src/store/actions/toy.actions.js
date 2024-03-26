import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_TOYS, UPDATE_TOY,SORT_BY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    return toyService.query(filterBy,sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SORT_BY, sortBy })
}