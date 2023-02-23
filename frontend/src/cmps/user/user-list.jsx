import { UserPreview } from './user-preview'

export function UserList({ users, onRemoveUser, history }) {
    
    return (
        <div className='user-list preview-cards-grid'>
            {users.map(user => <UserPreview key={user._id} user={user} onRemoveUser={onRemoveUser}  />)}
        </div>
    )
}
