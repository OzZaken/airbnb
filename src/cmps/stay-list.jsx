import { StayPreview } from './stay-preview'


export function StayList({ stays, onRemoveStay }) {

  if (!stays) return
  return <ul className="stay-list">
      {stays.map((stay) => (
        <StayPreview key={stay._id} stay={stay} />
      ))}
    </ul>
}

