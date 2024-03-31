
import { useEffect, useRef, useState } from "react"

import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { FilterInput } from "./FilterInput.jsx"
import { LabelSelect } from "./LabelSelect.jsx"

import { ToySort } from "./ToySort.jsx"
import { useSelector } from "react-redux"
import { InStock } from "./InStock.jsx"


export function ToyFilter({ filterBy, onSetFilter }) {
    const labels = useSelector((storeState) => storeState.toyModule.labels)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {

        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { name, inStock, sortBy, byLabel } = filterByToEdit
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <FilterInput handleChange={handleChange} name={name} />
            <LabelSelect
                handleChange={handleChange}
                labels={labels}
                byLabel={byLabel}
            />
            <InStock inStock={inStock} handleChange={handleChange} />
            <ToySort sortBy={sortBy} handleChange={handleChange} />
        </section>
    )
}