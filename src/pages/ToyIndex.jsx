import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { loadToys, removeToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex(){

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)



    useEffect(() => {
        loadToys(filterBy,sortBy)
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy,sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
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



console.log(user);
if(!toys) return <h1>Loading....</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the toys that you whant in one place</h1>
            {
              user && user.isAdmin && <Link to='/toy/edit'> <button>Add new toy</button></Link>
            }
            
            <ToyFilter 
            filterBy={filterBy} onSetFilter={onSetFilter}
            onSetSort={onSetSort} sortBy={sortBy}
            />
            <main>
                <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                user={user}
                />
            </main>
        </section>
    )
}