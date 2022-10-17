import { StayPreview } from './stay-preview'

export const StayList = ({ stays }) => {
  return <section className='main-layout stay-list'>
 <ul className="clean-list card-grid">
    {stays.map(stay => 
      <StayPreview
        key={stay._id}
        stay={stay}
      />
    )}
  </ul>
  </section>
}