import { Link } from 'react-router-dom'

export function UserPreview({ user, onRemoveUser }) {
    // user.avatar?user.avatar:
    const userStyle = { backgroundImage: `url(https://robohash.org/${user._id})` }
    return (
        <section style={userStyle} className='user-preview'>
            <Link to={`/user/${user._id}`} className='info'>
                <h2>{user.model}</h2>
                <h4>{user.type}</h4>
            </Link>

            <div className='actions'>
                <button onClick={() => onRemoveUser(user._id)}>Delete</button>
                <Link to={`/user/edit/${user._id}`} >Edit</Link>
            </div>
        </section>
    )
}
