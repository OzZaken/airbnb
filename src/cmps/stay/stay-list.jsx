import { StayPreview } from './stay-preview'

export const StayList = ({ stays, getStayAvgRate }) => {
  return <ul className="clean-list card-grid stay-list ">
    {stays.map(stay => 
      <StayPreview
        key={stay._id}
        stay={stay}
        getStayAvgRate={getStayAvgRate}
      />
    )}
  </ul>
}