import _ from 'lodash'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import Slider, { SliderThumb } from '@mui/material/Slider'
import Button from '@mui/material'
import { ReactComponent as CloseIcon } from '../../assets/imgs/svg/close-icon.svg'
import { styled } from '@mui/material/styles'
import { useEffect, useRef } from "react"

export const StayFilterBy = ({ stays,filterBy, onUpdateFilter,
    allPlaceTypes, allPropertyTypes, allAmenities,
    debounce, onSubmit, onClose, onResetLocalFilterBy,
    handleFieldCount, handlePropertyType, handleCheckBox
}) => {
    const stayCount = useRef(stays.length)
    console.log({stayCount})

    // setFilter when unmount
    useEffect(() => {
        return () => onUpdateFilter(filterBy)
    }, [])

    const { priceRange, rateRange, capacityRange, dateRange } = filterBy
    const [minPrice, maxPrice] = priceRange
    const [minRate, maxRate] = rateRange
    const [minCapacity, maxCapacity] = capacityRange
    const [checkIn, checkOut] = dateRange

    return filterBy && <article className='stay-filter-by'>
        <header className="filter-by-header">
            {/* <CloseIcon /> */}
            <IconButton className="close-filter-by" onClick={onClose}>x</IconButton>

            <div className="filter-by-title">Filters</div>
        </header>

        <form className='filter-by-form'>
            <section className="filter-by-price">
                <label className="title price-title" id="filter-by-price">Price</label>

                {/* <AirBnbSlider components={{ Thumb: _RangeSlider }}
                    min={minPrice}
                    max={maxPrice}
                    step={10}
                    id="price"
                    name="price"
                    onChange={debounce}
                    valueLabelDisplay="auto"
                /> */}
            </section>

            <section className="filter-by-place-type">
                <h2 className="title place-type-title">Type of place</h2>

                <div className="place-type-container">
                    {allPlaceTypes.map(placeT =>
                        <label key={placeT} className="checkbox-container" >
                            <input id={placeT} key={placeT} type="checkbox"
                                name="placeTypes"
                                checked={filterBy.placeTypes[placeT] || false}
                                onChange={handleCheckBox}
                            />

                            <span className="checkmark"></span>
                            {placeT}
                        </label>
                    )}
                </div>
            </section>

            <section className="filter-by-bedrooms">
                <h2 className="title bedrooms-title">Bedrooms</h2>

                {/* {_.range(0, 9).map(n => <RoomButton id="bedrooms"
                    className={filterBy.bedrooms === n ? 'active' : ''}
                    sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
                    value={n}
                    type="number"
                    name="bedrooms"
                    key={`room_${n}`}
                    onClick={handleFieldCount}>
                    {!n ? 'Any' : n}
                </RoomButton>
                )} */}
            </section>

            <section className="filter-by-bathrooms">
                <h2 className="title bathrooms-title">rooms</h2>

                {/* {_.range(0, 9).map((nth, idx) => <RoomButton
                    sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
                    className={filterBy.bathrooms === nth ? 'active' : ''}
                    value={nth}
                    id="rooms"
                    type="number"
                    name="bathrooms"
                    key={`bathrooms-${nth}-${idx}`}
                    onClick={handleFieldCount}>
                    {!nth ? 'Any' : nth}
                </RoomButton>
                )} */}
            </section>

            <section className="filter-by-bedrooms">
                <h2 className="bedrooms-title">Beds</h2>

                {/* {_.range(0, 9).map((nth, idx) => <RoomButton
                    sx={{ borderRadius: 5, border: 1, borderColor: '#222222', marginInlineEnd: 1 }}
                    className={filterBy.beds === nth ? 'active' : ''}
                    value={nth}
                    id="beds"
                    type="number"
                    name="beds"
                    key={`beds-${nth}-${idx}`}
                    onClick={handleFieldCount}>
                    {!nth ? 'Any' : nth}
                </RoomButton>
                )} */}
            </section>

            <section className="filter-by-property-type">
                <h2 className="property-title">Property type</h2>

                <div className="property-buttons">
                    {allPropertyTypes.map((propertyT, idx) => <button name="property-type" value={propertyT}
                        className={filterBy.propertyTypes[propertyT] ? 'active' : ''}
                        onClick={ev => { handlePropertyType(ev, propertyT) }}
                        key={`property-${propertyT}-${idx}`}
                    >
                        <div className="inner-property-btn">
                            <img alt='' className="property-img" src={`../assets/imgs/png/${propertyT.toLowerCase()}.png`} />
                            <div className="inner-property-button-txt">{propertyT}</div>
                        </div>
                    </button>
                    )}
                </div>
            </section>

            <section className="filter-by-amenities">
                <h2 className="title">Amenities</h2>

                <div className="amenities-list">
                    {allAmenities.map((a, idx) => <label key={a} className="checkbox-container" >
                        <input id={a} key={`amenities-list-${a}-${idx}`} type="checkbox"
                            name="amenities"
                            checked={filterBy.amenities[a] || false}
                            onChange={handleCheckBox}
                        />
                        <span className="checkmark"></span>
                        {a}
                    </label>
                    )}
                </div>
            </section>
        </form>

        <footer className="filter-by-footer">
            <Link onClick={onResetLocalFilterBy} component="button" variant="body1" color="#000000" fontWeight="bold">
                Clear all
            </Link>

            <button className="filter-btn" onClick={onSubmit}>
                Show {stayCount.current} homes
            </button>
        </footer>
    </article>
}

// const _RangeSlider = (props) => {
//     const { children, ...other } = props
//     return <SliderThumb {...other}>{children}</SliderThumb>
// }

// const AirBnbSlider = styled(Slider)(({ theme }) => ({
//     color: '#3a8589',
//     height: 3,
//     padding: '13px 0',
//     '& .MuiSlider-thumb': {
//         height: 27,
//         width: 27,
//         backgroundColor: '#fff',
//         border: '1px solid currentColor',
//         '&:hover': {
//             boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
//         },
//         '& .airbnb-bar': {
//             height: 9,
//             width: 1,
//             backgroundColor: 'currentColor',
//             marginLeft: 1,
//             marginRight: 1,
//         },
//     },
//     '& .MuiSlider-track': { height: 3 },
//     '& .MuiSlider-rail': {
//         color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
//         opacity: theme.palette.mode === 'dark' ? undefined : 1,
//         height: 3,
//     },
// }))

// const RoomButton = styled(Button)(({ theme }) => ({
//     color: theme.palette.getContrastText('#ffffff'),
//     backgroundColor: '#ffffff00',
//     '&:hover': {
//         backgroundColor: '#000000',
//         color: theme.palette.getContrastText('#000000'),
//     },
// }))