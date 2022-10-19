import { StayPreview } from './stay-preview'

export const StayList = ({ stays }) => {
  return <section className='main-layout stay-list'>
    <ul className="clean-list card-grid">
      {stays && stays.length ? stays.map(stay =>
        <StayPreview
          key={stay._id}
          stay={stay}
        />
      ) : 'Stays not found'}
    </ul>
  </section>
}