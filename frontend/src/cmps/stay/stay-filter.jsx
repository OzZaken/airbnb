import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import { AmenityList } from './stay-amenity-list'
import { CarouselApp } from '../app-carousel'
import { StayFilterBy } from './stay-filter-by'

const filterBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
}

export const StayFilter = ({ filterBy,
    allAmenities, allPlaceTypes, allPropertyTypes,
    onChangeFilter, onChangeAmenity, onChangeDestination
}) => {
    // console.log(`%c Total of ${allAmenities.length} amenities filterBy ${amenities?.length || 0}`, 'color: yellowgreen;')
    const [localFilter, setLocalFilter] = useState(filterBy)

    const [isFilterByOpen, setIsFilterByOpen] = useState(false)
    const onOpenFilterBy = () => setIsFilterByOpen(true)
    const onCloseFilterBy = () => setIsFilterByOpen(false)

    const onSubmit = ev => {
        ev.preventDefault()
        setLocalFilter(localFilter)
        onCloseFilterBy()
    }

    const onResetLocalFilterBy = ev => {
        ev.preventDefault()
        setLocalFilter(null)
    }

    const handleFilters = ev => {
        setLocalFilter(prevFields => ({
            ...prevFields, [ev.target.name]: ev.target.value
        }))
    }

    const debouncedChangeHandler = useMemo(() => debounce(handleFilters, 500), [])

    const handleFieldCount = ev => {
        const field = ev.target.name
        const val = ev.target.value
        setLocalFilter(prevFields => ({
            ...prevFields, [field]: +val
        }))
    }

    const handlePropertyType = (ev, propertyT) => {
        ev.preventDefault()
        const type = propertyT
        setLocalFilter(prevFields => ({
            ...prevFields,
            propertyTypes: {
                ...prevFields.propertyTypes,
                [type]: !prevFields.propertyTypes[type]
            }
        }))
    }

    const handleCheckBox = ({ target }) => {
        const { checked, name } = target
        setLocalFilter(prevFields => ({
            ...prevFields,
            [name]: {
                ...prevFields[name],
                [name]: checked
            }
        }))
    }


    const filterByProps = {
        filterBy: localFilter,
        debounce: debouncedChangeHandler,
        onClose: onCloseFilterBy,
        handleFieldCount,
        handlePropertyType,
        handleCheckBox,
        allPlaceTypes,
        allPropertyTypes,
        allAmenities,
        onChangeFilter,
        onSubmit,
        onResetLocalFilterBy,
    }

    return localFilter && <section className='stay-filter'>
        {/* Amenities Carousel */}
        <CarouselApp items={<AmenityList
            amenities={allAmenities}
            onSetFilterByAmenity={onSetFilterByAmenity}
        />} />

        {/* open FilterBy Modal */}
        <Badge color="primary" badgeContent={3} className={3 ? 'filter-active' : ''}>
            <button onClick={onOpenFilterBy} className={`${3 ? 'active' : ''} btn-filters`}>
                <TuneIcon /> &nbsp;Filters
            </button>
        </Badge>

        {/* FilterBy Modal */}
        <Modal open={isFilterByOpen} onClose={onCloseFilterBy}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >  <Fade in={isFilterByOpen}>
                <Box sx={filterBoxStyle}  >
                    <StayFilterBy {...filterByProps} />
                </Box>
            </Fade>
        </Modal>
    </section>
}