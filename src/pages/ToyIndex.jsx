import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex(){

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
          } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
          }
    }

if(!toys) return <h1>Loading....</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the toys that you whant in one place</h1>
            {
              user && user.isAdmin && <Link to='/toy/edit'> <button className='btn'>Add new toy</button></Link>
            }
            <section className='toy-filter'>
             <ToyFilter 
            filterBy={filterBy} onSetFilter={onSetFilter}
            />   
            </section>
            
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