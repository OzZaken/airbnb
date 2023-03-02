import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { userService } from '../services/user.service'

export const UserEdit = (props) => {

    const params = useParams()
    const navigate = useNavigate()
 
    const [user, handleChange, setUser] = useForm({
        model: '',
        type: ''
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        const userId = params.id
        if (!userId) return
        userService.getById(userId)
            .then(user => {
                setUser(user)
            })
            .catch(err => {
                console.log('err:', err);
            })
    }, [])

    const onSaveUser = (ev) => {
        ev.preventDefault()
        userService.save({ ...user }).then(() => {
            navigate('/')
        })
    }

    return (
        <section className='user-edit'>
            <h1>{user._id ? 'Edit' : 'Add'} User</h1>
            <form onSubmit={onSaveUser}>
                <label htmlFor="model">Model</label>
                <input ref={inputRef} value={user.model} onChange={handleChange} type="text" name="model" id="model" />

                <label htmlFor="type">Type</label>
                <select value={user.type} onChange={handleChange} name="type" id="type">
                    <option disabled value="">Choose a type</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Pleasure">Pleasure</option>
                    <option value="Office">Office</option>
                </select>

                <button>Save</button>
            </form>
        </section>
    )
}
