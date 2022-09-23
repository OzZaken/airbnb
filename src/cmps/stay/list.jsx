import { StayPreview } from './preview'

export function StayList({ stays }) {

  if (!stays) return
  return <ul className="stay-list">
      {stays.map(stay => (
        <StayPreview inHomePage={true}key={stay._id} stay={stay} />
      ))}
    </ul>
}