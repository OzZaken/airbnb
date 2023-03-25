import { debounce } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { StayLabelList } from './stay-label-list'
import { StayFilterBy } from './stay-filter-by'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'

export const StayFilter = ({
    stays,
    filterBy, onUpdateFilterBy,
    onGetFieldRange, filtersParams,
    allAmenities, allLabels, allPlaceTypes, allPropertyTypes, allRegions,
    onUpdateAmenityBy, onUpdateLabelBy, onUpdateRangeBy, onUpdateSortBy, onUpdateRegionBy,
}) => {
    const [localFilter, setLocalFilter] = useState(filterBy)

    const [isFilterByOpen, setIsFilterByOpen] = useState(false)
    const onOpenFilterBy = () => setIsFilterByOpen(true)
    const onCloseFilterBy = () => setIsFilterByOpen(false)

    const filtersCountRef = useRef(0)

    useEffect(() => {
        if (filtersParams) filtersCountRef.current = Object.keys(filtersParams).length
        else filtersCountRef.current = 0
        console.log(`🚀 ~ filtersCount.current:`, filtersCountRef.current)
    }, [filtersParams])

    // get current range each stays update. 
    useEffectUpdate(() => {
        const fields = ['price', 'capacity']
        const rangeBy = {}
        for (let i = 0; i < fields.length; i++) {
            rangeBy[`${fields[i]}Range`] = onGetFieldRange(fields[i])
        }
        setLocalFilter({ ...localFilter, ...rangeBy })
    }, [stays])

    /* FORM */
    const onSubmit = ev => {
        ev.preventDefault()
        setLocalFilter(localFilter)
        onUpdateFilterBy(localFilter)
        onCloseFilterBy()
    }

    const handleFilters = ev => {
        setLocalFilter(prevFields => ({
            ...prevFields,
            [ev.target.name]: ev.target.value
        }))
    }
    const debouncedChangeHandler = useMemo(() => debounce(handleFilters, 500), [])

    const onResetLocalFilterBy = ev => {
        ev.preventDefault()
        setLocalFilter(null) // or filterBy 
    }

    const handleFieldCount = ev => {
        const field = ev.target.name
        const val = ev.target.value
        setLocalFilter(prevFields => ({
            ...prevFields,
            [field]: +val
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

    const handleCheckBox = ({ target: { checked, name } }) => {
        setLocalFilter(prevFields => ({
            ...prevFields,
            [name]: {
                ...prevFields[name],
                checked
            }
        }))
    }

    const stayLabelsList = {
        labels: allLabels,
        onUpdateFilterBy
    }

    const amenitiesList = {
        amenities: allAmenities,
    }

    const badgeFilters = {
        color: 'primary',
        badgeContent: filtersCountRef.current,
        className: filtersCountRef.current ? 'filter-active' : ''
    }

    const btnOpenFilterBy = {
        onClick: () => onOpenFilterBy(),
        className: filtersCountRef.current ? 'btn-filters active' : 'btn-filters'
    }

    const modalFilterBy = {
        onClose: onCloseFilterBy,
        BackdropComponent: Backdrop,
        BackdropProps: { timeout: 500 },
        open: isFilterByOpen || false,
    }

    const stayFilterBy = {
        stays,
        filtersCount: filtersCountRef.current,
        staysCount: stays.length,
        localFilter,
        debounce: debouncedChangeHandler,
        allAmenities, allLabels, allPlaceTypes, allPropertyTypes, 
        onUpdateFilterBy,
        onClose: onCloseFilterBy,
        onSubmit,
        onResetLocalFilterBy,
        handleFieldCount,
        handlePropertyType,
        handleCheckBox,
    }

    return <section className='stay-filter'>
        <StayLabelList {...stayLabelsList} />

        <Badge {...badgeFilters}>
            <button {...btnOpenFilterBy}>
                <TuneIcon /> &nbsp;Filters</button>
        </Badge>

        <Modal {...modalFilterBy} closeAfterTransition >
            <Fade in={isFilterByOpen}>

                <Box className="box-stay-filter-by">
                    <StayFilterBy {...stayFilterBy} />
                </Box>
            </Fade>
        </Modal>
    </section>
}