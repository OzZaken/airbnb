import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

/* trigger the callback whenever the fields state changes. */
export const useFormRegister = (initialState, cb) => {
    /* create state variables and their setter functions. */
    const [fields, setFields] = useState(initialState)

    // on changed each field if there onChange func trigger it.
    useEffectUpdate(() => {
        if (cb) cb(fields)
    }, [fields])

    // handle the change event of the form fields and update the state accordingly.
    const handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +target.value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            case 'date':
                value = new Date(value)
                break

            case 'time':
                const newDate = new Date()
                const hours = value.split(':')[0]
                const minutes = value.split(':')[1]
                newDate.setHours(hours)
                newDate.setMinutes(minutes)
                value = newDate
                break

            default:
                break
        }
        handleChangeElseIf()
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    const handleChangeElseIf = ({ target }) => {
        const field = target.name
        let value = target.value

        if (target.type === 'checkbox') value = target.checked
        else if (target.type === 'radio') {
            if (target.checked) value = target.value
            else return
        }
        else if (target.type === 'date') value = new Date(value).toISOString().slice(0, 10)
        else if (target.type === 'time') value = new Date(`2000-01-01T${value}`).toISOString().slice(11, 19)
        else if (target.type === 'number') value = parseInt(value)
        console.log('...prevFields, [field]: value:')
        console.log({ ...prevFields, [field]: value })
        // setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    // YYYY-MM-DD format.
    const getFormattedDate = (value) => {
        const valueDate = new Date(value)
        return `${valueDate.getFullYear()}-${(valueDate.getMonth() + 1 + '').padStart(2, '0')}-${(valueDate.getDate() + '').padStart(2, '0')}`
    }
    // HH:MM format.
    const getFormattedTime = (value) => {
        const valueTime = new Date(value)
        return `${(valueTime.getHours() + '').padStart(2, '0')}:${(valueTime.getMinutes() + '').padStart(2, '0')}`
    }

    /** register form fields with their corresponding properties:
     *  name, type, value, checked, and id.
     *  It returns an object containing these properties,
     *  which can be used as props for form input elements. */
    const register = (field, type = '', value) => {// value only used when type === 'radio'
        const inputProp = {
            onChange: handleChange,
            name: field,
            id: field,
            value: fields[field],
            type
        }
        if (type === 'checkbox') inputProp.checked = fields[field]
        if (type === 'date') inputProp.value = getFormattedDate(fields[field])
        if (type === 'time') inputProp.value = getFormattedTime(fields[field])
        if (type === 'radio') {
            inputProp.value = value
            inputProp.id = value
            inputProp.checked = fields[field] === value
        }
        return inputProp
    }

    return [register, setFields, fields]
}