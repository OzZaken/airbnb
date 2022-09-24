import { StayPreview } from './stay-preview'

export const StayList = ({ stays, getStayAvgRate }) => {

  if (!stays) return
  return <ul className="clean-list card-grid stay-list ">
    {stays.map(stay => (
      <StayPreview
        inHomePage={true}
        key={stay._id}
        stay={stay} 
        getStayAvgRate={getStayAvgRate} 
        />
    ))}
  </ul>
}