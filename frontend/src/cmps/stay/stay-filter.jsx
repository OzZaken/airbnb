import { debounce } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import { AmenityList } from '../amenity/amenity-list'
import { StayFilterBy } from './stay-filter-by'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'

export const StayFilter = ({ stays, filterBy,filters,
     onUpdateFilter, getRange,
    allAmenities, allPlaceTypes, allPropertyTypes, allRegions,
    onUpdateRangeBy, onUpdateSortBy, onUpdateRegionBy, onUpdateAmenityBy }) => {
    const [localFilterBy, setLocalFilterBy] = useState(filterBy)
    const [isFilterByOpen, setIsFilterByOpen] = useState(false)
    const filtersCount = useRef(0)

    useEffect(() => {
        if (filters) filtersCount.current = Object.keys(filters.length)
        else filtersCount.current = 0
        console.log(`🚀 ~ filtersCount.current:`, filtersCount.current)
    }, [filters])

    // get current range for each stays update. 
    useEffectUpdate(() => {
        const fields = ['price', 'capacity']
        const rangeBy = {}
        for (let i = 0; i < fields.length; i++) {
            rangeBy[`${fields[i]}Range`] = getRange(fields[i])
        }
        setLocalFilterBy({ ...localFilterBy, ...rangeBy })
    }, [stays])

    const onOpenFilterBy = () => setIsFilterByOpen(true)
    const onCloseFilterBy = () => setIsFilterByOpen(false)

    /* FORM */
    const onSubmit = ev => {
        ev.preventDefault()
        setLocalFilterBy(localFilterBy)
        onCloseFilterBy()
    }

    const handleFilters = ev => {
        setLocalFilterBy(prevFields => ({
            ...prevFields,
            [ev.target.name]: ev.target.value
        }))
    }
    const debouncedChangeHandler = useMemo(() => debounce(handleFilters, 500), [])

    const onResetLocalFilterBy = ev => {
        ev.preventDefault()
        setLocalFilterBy(null)
    }

    const handleFieldCount = ev => {
        const field = ev.target.name
        const val = ev.target.value
        setLocalFilterBy(prevFields => ({
            ...prevFields,
            [field]: +val
        }))
    }

    const handlePropertyType = (ev, propertyT) => {
        ev.preventDefault()
        const type = propertyT
        setLocalFilterBy(prevFields => ({
            ...prevFields,
            propertyTypes: {
                ...prevFields.propertyTypes,
                [type]: !prevFields.propertyTypes[type]
            }
        }))
    }

    const handleCheckBox = ({ target: { checked, name } }) => {
        setLocalFilterBy(prevFields => ({
            ...prevFields,
            [name]: {
                ...prevFields[name],
                checked
            }
        }))
    }

    const amenityList = {
        amenities: allAmenities,
        isContainsTitle: true,
        isContainsIcon: true,
        onUpdateFilter
    }

    const badgeFilters = {
        color: 'primary',
        badgeContent: filtersCount.current,
        className: filtersCount.current ? 'filter-active' : ''
    }

    const btnOpenFilterBy = {
        onClick: () => onOpenFilterBy,
        className: filtersCount.current ? 'btn-filters active' : 'btn-filters'
    }

    const modalFilterBy = {
        isOpen: isFilterByOpen,
        onClose: onCloseFilterBy,
        BackdropComponent: Backdrop,
        BackdropProps: { timeout: 500 },
        open: isFilterByOpen || false,

    }

    const stayFilterBy = {
        filtersCount: filtersCount.current,
        staysCount: stays.length,
        filterBy: localFilterBy,
        debounce: debouncedChangeHandler,
        allPlaceTypes,
        allPropertyTypes,
        allAmenities,
        onUpdateFilter,
        onClose: onCloseFilterBy,
        onSubmit,
        onResetLocalFilterBy,
        handleFieldCount,
        handlePropertyType,
        handleCheckBox,
    }

    return <section className='stay-filter'>
        <AmenityList {...amenityList} />

        <Badge {...badgeFilters}>
            <button {...btnOpenFilterBy}>
                <TuneIcon /> &nbsp;Filters</button>
        </Badge>

        <Modal {...modalFilterBy} closeAfterTransition >
            <Fade in={isFilterByOpen}>

                <Box {...boxStayFilterBy}>
                    <StayFilterBy {...stayFilterBy} />
                </Box>
            </Fade>
        </Modal>
    </section>
}

const boxStayFilterBy = {
    sx: {
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
}