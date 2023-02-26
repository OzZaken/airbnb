import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, getStayAvgRate }) {
    return <section className='stay-list'>
        {stays.map(stay => <StayPreview key={stay._id} stay={stay} onRemoveStay={onRemoveStay} avgRate={getStayAvgRate} />)}
    </section>
}