import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex(){

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)



    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


// console.log(toys);
if(!toys) return <h1>Loading....</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the toys that you whant in one place</h1>
            <Link to='/toy/edit'> <button>Add new toy</button></Link>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
            <main>
                <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                />
            </main>
        </section>
    )
}