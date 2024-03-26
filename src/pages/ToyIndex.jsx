import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex(){

    const toys = useSelector(storeState => storeState.toyModule.toys)


    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


console.log(toys);
if(!toys) return <h1>Loading....</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the toys that you whant in one place</h1>
            <Link to='/toy/edit'> <button>Add new toy</button></Link>
            <main>
                <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                />
            </main>
        </section>
    )
}