import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys } from '../store/actions/toy.actions.js'


export function ToyIndex(){

    const toys = useSelector(storeState => storeState.toyModule.toys)


    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])
console.log(toys);
if(!toys) return <h1>Loading....</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the toys that you whant in one place</h1>
            <main>
                <ToyList
                toys={toys}
                />
            </main>
        </section>
    )
}