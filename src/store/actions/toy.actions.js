import { toyService } from "../../services/toy.service.js"
import { SET_TOYS } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export function loadCars() {
    return toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
}