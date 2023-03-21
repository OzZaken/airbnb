import { debounce } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import { AmenityList } from '../amenity/amenity-list'
import { CarouselApp } from '../app-carousel'
import { StayFilterBy } from './stay-filter-by'

export const StayFilter = ({ stays, filterBy, filters,
    onUpdateFilter,
    allAmenities, allPlaceTypes, allPropertyTypes, allRegions,
    onUpdateRangeBy, onUpdateSortBy, onUpdateRegionBy, onUpdateAmenityBy }) => {

    /* USE */
    const [localFilterBy, setLocalFilterBy] = useState(filterBy)
    const [isFilterByOpen, setIsFilterByOpen] = useState(false)
    const filtersCount = useRef(0)

    /* EFFECT */
    useEffect(() => {
        if (filters) filtersCount.current = Object.keys(filters.length)
        else filtersCount.current = 0
        console.log(`🚀 ~ filtersCount.current:`, filtersCount.current)
    }, [filters])

    /* FUNCS */
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

    /* CMPS */
    const amenityList = {
        amenities: allAmenities,
        isContainsTitle: true,
        isContainsIcon: true
    }

    const badge = {
        color: 'primary',
        badgeContent: filtersCount.current,
        className: filtersCount.current ? 'filter-active' : ''
    }

    const btn = {
        onClick: () => onOpenFilterBy,
        className: filtersCount.current ? 'btn-filters active' : 'btn-filters'
    }

    const box = {
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

    const modal = {
        isOpen: isFilterByOpen,
        onClose: onCloseFilterBy,
        BackdropComponent: Backdrop,
        BackdropProps: { timeout: 500 },
        open: isFilterByOpen || false,

    }

    const stayFilterBy = {
        filtersCount: 5,
        staysCount: stays.length,
        filterBy: localFilterBy,
        allPlaceTypes, allPropertyTypes, allAmenities,
        debounce: debouncedChangeHandler,
        onUpdateFilter,
        onClose: onCloseFilterBy,
        onSubmit,
        onResetLocalFilterBy,
        handleFieldCount,
        handlePropertyType,
        handleCheckBox,
    }

    return <section className='stay-filter'>
        <CarouselApp items={<AmenityList {...amenityList} />} />

        <Badge {...badge}>
            <button {...btn}>
                <TuneIcon /> &nbsp;Filters</button>
        </Badge>

        <Modal {...modal} closeAfterTransition >

            <Fade in={isFilterByOpen}>

                <Box {...box}>

                    <StayFilterBy {...stayFilterBy} />
                </Box>
            </Fade>
        </Modal>
    </section>
}