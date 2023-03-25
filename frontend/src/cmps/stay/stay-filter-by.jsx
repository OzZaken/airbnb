import _ from 'lodash'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import Button from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useRef } from "react"

import { Grid, Typography } from "@material-ui/core";

const prices = []
for (let i = 0; i < 500; i++) {
    prices.push(Math.floor(Math.random() * 80) + 1)
}

export const StayFilterBy = ({
    stays, localFilter,
    onClose, onSubmit, onUpdateFilterBy,
    allAmenities, allLabels, allPlaceTypes, allPropertyTypes,
    debounce, onResetLocalFilterBy,
    handleFieldCount, handlePropertyType, handleCheckBox
}) => {
    const staysCountRef = useRef(stays.length)

    const { priceRange, rateRange, capacityRange, dateRange } = localFilter
    const [minPrice, maxPrice] = priceRange
    const [minRate, maxRate] = rateRange
    const [minCapacity, maxCapacity] = capacityRange
    const [checkIn, checkOut] = dateRange

    const formFilterBy = {
        onClose, onSubmit, localFilter,
        allAmenities, allLabels, allPlaceTypes, allPropertyTypes, handleCheckBox
    }

    const footerFilterBy = {
        onResetLocalFilterBy,
        onSubmit,
        staysCountRef
    }
    return localFilter && <section className='stay-filter-by'>
        <HeaderFilterBy onClose={onClose} />

        <FormFilterBy {...formFilterBy} />

        <FooterFilterBy {...footerFilterBy} />
    </section>
}

const HeaderFilterBy = ({ onClose }) => {
    return <div className="filter-by-header">
        <IconButton className="close-filter-by" onClick={() => onClose()}>x</IconButton>
        <Typography className="filter-by-title"variant="h5">Filters</Typography>
    </div>
}

const FormFilterBy = ({ onSubmit, onClose, localFilter, handleCheckBox, allAmenities, allLabels, allPlaceTypes, allPropertyTypes }) => {

    return <form className='filter-by-form' {...onSubmit}>
        <section className="filter-by-price">
            <label className="title price-title" id="filter-by-price">Price</label>
            <RangeSliderApp />
        </section>

        {/* <section className="filter-by-place-type">
            <h2 className="title place-type-title">Type of place</h2>

            <div className="place-type-container">
                {allPlaceTypes.map((placeT, idx) => {

                    const [key, title] = Object.entries(placeT)
                    const isPlaceTypeIncluded = localFilter.placeTypes.includes(placeT)
                    return <label key={key + idx} className="checkbox-container" >

                        <input id={placeT} type="checkbox" name="placeTypes"
                            checked={isPlaceTypeIncluded}
                            onChange={handleCheckBox}
                        />

                        <span className="checkmark"></span>

                        {title}
                    </label>
                })}
            </div>
        </section> */}

        <button onClick={ev => {
            ev.preventDefault()
            onClose()
        }}>filter</button>
    </form>
}

const FooterFilterBy = ({ onResetLocalFilterBy, onSubmit, staysCountRef }) => {
    return <footer className="filter-by-footer">
        <Link onClick={onResetLocalFilterBy} component="button" variant="body1" color="#000000" fontWeight="bold">
            Clear all
        </Link>

        <button className="filter-btn" onClick={onSubmit}>
            Show {staysCountRef.current} homes
        </button>
    </footer>
}

const StaySortBy = ({ onChangeSort }) => {
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

const RangeSliderApp = () => {
    return <Grid container justifyContent="center" style={{ marginTop: "33px" }}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
        Grid checking
        </Grid>

        <Grid item xs={12} lg={8}>
        </Grid>
    </Grid>
}
// <section className="filter-by-bedrooms">
// <h2 className="title bedrooms-title">Bedrooms</h2>

// {/* {_.range(0, 9).map(n => <RoomButton id="bedrooms"
//     className={filterBy.bedrooms === n ? 'active' : ''}
//     sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
//     value={n}
//     type="number"
//     name="bedrooms"
//     key={`room_${n}`}
//     onClick={handleFieldCount}>
//     {!n ? 'Any' : n}
// </RoomButton>
// )} */}
// </section>

// <section className="filter-by-bathrooms">
// <h2 className="title bathrooms-title">rooms</h2>

// {/* {_.range(0, 9).map((nth, idx) => <RoomButton
//     sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
//     className={filterBy.bathrooms === nth ? 'active' : ''}
//     value={nth}
//     id="rooms"
//     type="number"
//     name="bathrooms"
//     key={`bathrooms-${nth}-${idx}`}
//     onClick={handleFieldCount}>
//     {!nth ? 'Any' : nth}
// </RoomButton>
// )} */}
// </section>

// <section className="filter-by-bedrooms">
// <h2 className="bedrooms-title">Beds</h2>

// {/* {_.range(0, 9).map((nth, idx) => <RoomButton
//     sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
//     className={filterBy.beds === nth ? 'active' : ''}
//     value={nth}
//     id="beds"
//     type="number"
//     name="beds"
//     key={`beds-${nth}-${idx}`}
//     onClick={handleFieldCount}>
//     {!nth ? 'Any' : nth}
// </RoomButton>
// )} */}
// </section>

// <section className="filter-by-property-type">
// <h2 className="property-title">Property type</h2>

// <div className="property-buttons">
//     {allPropertyTypes.map((propertyT, idx) => <button name="property-type" value={propertyT}
//         className={localFilter.propertyTypes[propertyT] ? 'active' : ''}
//         onClick={ev => { handlePropertyType(ev, propertyT) }}
//         key={`property-${propertyT}-${idx}`}
//     >
//         <div className="inner-property-btn">
//             <img alt='' className="property-img" src={`../assets/imgs/png/${propertyT.toLowerCase()}.png`} />
//             <div className="inner-property-button-txt">{propertyT}</div>
//         </div>
//     </button>
//     )}
// </div>
// </section>

// <section className="filter-by-amenities">
// <h2 className="title">Amenities</h2>

// <div className="amenities-list">
//     {allAmenities.map((a, idx) => <label key={a} className="checkbox-container" >
//         <input id={a} key={`amenities-list-${a}-${idx}`} type="checkbox"
//             name="amenities"
//             checked={localFilter.amenities[a] || false}
//             onChange={handleCheckBox}
//         />
//         <span className="checkmark"></span>
//         {a}
//     </label>
//     )}
// </div>
// </section>