// react
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Actions
import { loadUsers, removeUser, setFilterBy } from '../store/user.action'
// Components
import { UserFilter } from '../cmps/user-filter'
import { UserList } from '../cmps/user-list'

export const AdminApp = (props) => {
    const { users } = useSelector(state => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    const onRemoveUser = (userId) => {
        dispatch(removeUser(userId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadUsers())
    }

    if (!users) return <div> Todo: Loading...</div>
    return (
        <section className='container user-app'>
            <UserFilter onChangeFilter={onChangeFilter} />
            <Link to="/user/edit">Add User</Link>
            <UserList history={props.history} onRemoveUser={onRemoveUser} users={users} />
        </section>
    )
}