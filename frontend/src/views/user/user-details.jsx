import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { userService } from '../../services/user.service'

export const UserDetails = (props) => {
    const [user, setUser] = useState(null)
    const params = useParams()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(`🚀 ~ pathname`, pathname)
    }, [])

    useEffect(() => {
        loadUser()
    }, [params.id])

    const loadUser = () => {
        const userId = params.id
        userService.getById(userId)
            .then(user => {
                setUser(user)
            })
    }

    const onBack = () => {
        navigate('/')
    }

    if (!user) return <div>Loading...</div>
    return (
        <div className='user-details'>
            <section>
                <h3>Model: {user.model}</h3>
            </section>
            <section>
                <h3>Type: {user.type}</h3>
            </section>
            <section>
                <h3>Battery Status: {user.batteryStatus}</h3>
            </section>
            <img src={`https://robohash.org/${user._id}`} alt="" />
            <button onClick={onBack}>Back</button>
            <Link to='/user/r1' >Next User</Link>
        </div>
    )
}