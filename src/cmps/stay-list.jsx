import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay }) {
  return (
    <div className="stay-list stay-cards-grid">
      {stays.map((stay) => (
        <StayPreview key={stay._id} stay={stay} onRemoveStay={onRemoveStay} />
      ))}
    </div>
  )
}