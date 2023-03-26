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
    filterBy, sortBy, filtersParams,
    allAmenities, allLabels, allPlaceTypes, allPropertyTypes, allRegions,
    onUpdateFilterBy, onUpdateSortBy,
    getRange,
    onUpdateLabelBy, onUpdateRegionBy,
}) => {
    const [localFilterBy, setLocalFilter] = useState(filterBy)
    const [localSortBy, setLocalSort] = useState(sortBy)

    /* Modal */
    const [isFilterByOpen, setIsFilterByOpen] = useState(false)
    const onOpenFilterBy = () => setIsFilterByOpen(true)
    const onCloseFilterBy = () => setIsFilterByOpen(false)

    /* FiltersParams */
    const filtersCountRef = useRef(0)
    useEffect(() => {
        if (filtersParams) filtersCountRef.current = Object.keys(filtersParams).length
        else filtersCountRef.current = 0
    }, [filtersParams])

    /* each stays update, update current localFilter ranges. */
    useEffectUpdate(() => {
        const fields = ['price', 'capacity']
        const rangeBy = {}
        for (let i = 0; i < fields.length; i++) {
            rangeBy[`${fields[i]}Range`] = getRange(stays, fields[i])
        }
        console.log(`🚀 ~ rangeBy:`, rangeBy)
        setLocalFilter({ ...localFilterBy, ...rangeBy })
    }, [stays])

    /* FORM   */
    const onSubmit = ev => {
        ev.preventDefault()
        setLocalFilter(localFilterBy)
        onUpdateFilterBy(localFilterBy)
        onCloseFilterBy()
    }

    // const handleFilterByTarget = ev => {
    //     setLocalFilter(prevLocalFilterBy => ({
    //         ...prevLocalFilterBy,
    //         [ev.target.name]: ev.target.value
    //     }))
    // }

    // const debouncedChangeHandler = useMemo(
    //     () => debounce(handleFilterByTarget, 500)
    //     , []
    // )

    const getFieldProps = (field, type) => {
        const valueField = 'defaultValue'
        const onChange = debouncedChangeHandler
        return {
            onChange,
            name: field,
            id: field,
            [valueField]: localFilterBy[field],
            type
        }
    }

    const onResetLocalFilterBy = ev => {
        ev.preventDefault()
        setLocalFilter(filterBy)
    }


    // handle numeric input value
    const handleFieldCount = ev => {
        const field = ev.target.name
        const val = ev.target.value
        setLocalFilter(prevFields => ({
            ...prevFields,
            [field]: +val
        }))
    }

    // handle array input value
    const handleFieldArr = ev => {
        ev.preventDefault()
        const field = ev.target.name
        const val = ev.target.value

        setLocalFilter(prevFields => {
            const updatedTypes = [...prevFields.propertyTypes]
            const currTypeIdx = updatedTypes.indexOf(field)

            if (currTypeIdx === -1) updatedTypes.push(field)
            else updatedTypes.splice(currTypeIdx, 1)

            return {
                ...prevFields,
                propertyTypes: updatedTypes
            }
        })
    }

    // handle object input value
    const handleFieldMap = (ev, val) => {
        ev.preventDefault()
        const currType = val
        setLocalFilter(prevFields => ({
            ...prevFields,
            propertyTypes: {
                ...prevFields.propertyTypes,
                [currType]: !prevFields.propertyTypes[currType]
            }
        }))
    }

    // handle checkbox input value
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
        localFilter: localFilterBy,
        debounce: debouncedChangeHandler,
        allAmenities, allLabels, allPlaceTypes, allPropertyTypes,
        onUpdateFilterBy,
        onClose: onCloseFilterBy,
        onSubmit,
        onResetLocalFilterBy,
        handleFieldCount,
        handlePropertyType: handleFieldMap,
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