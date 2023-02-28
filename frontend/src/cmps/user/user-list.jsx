import { UserPreview } from './user-preview'

export function UserList({ users, onRemoveUser, history }) {
    
    return (
        <div className='user-list'>
            {users.map(user => <UserPreview key={user._id} user={user} onRemoveUser={onRemoveUser}  />)}
        </div>
    )
}
