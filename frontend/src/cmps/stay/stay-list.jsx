import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay}) {
    return <section className='stay-list preview-cards-grid'>
        {stays.map(stay => <StayPreview key={stay._id} stay={stay} onRemoveStay={onRemoveStay} />)}
    </section>
}