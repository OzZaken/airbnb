import { useRef } from 'react'

// import {StaySort} from './stay-sort'
{/* <StaySort onChangeSort={onChangeSort} /> */}

export const StaySort = ({ onChangeSort }) => {
    const valueRef = useRef(null)
    const descRef = useRef(null)

    const onSetSortBy = () => {
        const prop = valueRef.current.value
        const isDesc = descRef.current.checked

        const sortBy = { [prop]: isDesc ? -1 : 1 }
        onChangeSort(sortBy)
    }

    return <div className='stay-sort'>

        <select className="sort-by" ref={valueRef}>
            <option value="price">price</option>
            <option value="rate">rate</option>
            <option value="views">views</option>
        </select>

        <label>Descending
            <input type="checkbox" className="sort-desc" ref={descRef} />
        </label>

        <button onClick={onSetSortBy}>Sort</button>
    </div>
}