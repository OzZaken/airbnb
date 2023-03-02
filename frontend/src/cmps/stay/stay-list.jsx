import { StayPreview } from './stay-preview'


export function StayList({ stays, onRemoveStay, getStayAvgRate }) {

    const onLastPreviewRendered = () => {
        console.log('onLastPreviewRendered called');
        const cards = document.querySelectorAll('.stay-preview')

        const observer = new IntersectionObserver(entry => {
            console.log(`🚀 ~ entry:`, entry)
            entry.target.classList.toggle('show', entry.isIntersecting)
            if (entry.isIntersecting) observer.unobserve(entry.target)
        }, {
            // root:'stay-list',
            rootMargin: '100px'
            // threshold: 0.5
        })

        cards.forEach(card => { observer.observe(card) })

        const lastCardObserver = new IntersectionObserver(entries => {
            const lastCard = entries[0]
            if (!lastCard.isIntersecting) return
            // loadNewStays() dispatch(type:increment-pageIdx) // get more from the Api 
            lastCardObserver.unobserve(lastCard.target)
            lastCardObserver.observe(document.querySelector('.stay-preview:last-child'))
        }, {})

        lastCardObserver.observe(document.querySelector('.stay-preview:last-child'))
    }
    console.log('stays.length:', stays.length)
    return <section className='stay-list'>
        {stays.map((stay, idx) => {
            return <StayPreview
                key={stay._id}
                stay={stay}
                onRemoveStay={onRemoveStay}
                avgRate={getStayAvgRate}
                // Call the callback function after the last StayPreview component has been rendered
                onLoad={idx === stays.length - 1 ? onLastPreviewRendered : undefined}
            />
        })}
    </section>
}

                // onLastPreviewRendered={idx === stays.length - 1 ? onLastPreviewRendered : undefined}
                // onLastPreviewRendered={onLastPreviewRendered}
