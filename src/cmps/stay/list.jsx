import { StayPreview } from './preview'

export const StayList = ({ stays }) => {

  if (!stays) return
  return <ul className="stay-list clean-list">
    {stays.map(stay => (
      <StayPreview inHomePage={true} key={stay._id} stay={stay} />
    ))}
  </ul>
}