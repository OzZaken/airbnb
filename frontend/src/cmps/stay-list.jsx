import { StayPreview } from './stay-preview'


export function StayList({ stays, onRemoveStay, getStayAvgRate }) {

    const onLastPreviewRendered = () => {
        console.log('onLastPreviewRendered called');
        const stays = document.querySelectorAll('.stay-preview')

        const observer = new IntersectionObserver(entry => {
            entry.target.classList.toggle('show', entry.isIntersecting)
            if (entry.isIntersecting) observer.unobserve(entry.target)
        },
            { rootMargin: '0px 0px -100% 0px' }  // threshold: 0.5 || root:'stay-list',
        )

        stays.forEach(stay => { observer.observe(stay) })

        const lastCardObserver = new IntersectionObserver(entries => {
            const lastCard = entries[0]
            if (!lastCard.isIntersecting) return
            console.log('never');
            // loadNewStays() dispatch(type:increment-pageIdx) // get more from the Api 
            lastCardObserver.unobserve(lastCard.target)
            lastCardObserver.observe(document.querySelector('.stay-preview:last-child'))
        }, {})

        lastCardObserver.observe(document.querySelector('.stay-preview:last-child'))
    }

    const onLoad = (idx) => {
        console.log('onLoad',idx)
        if (idx === stays.length - 1) {
            onLastPreviewRendered()
        }
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
                onLoad={() => onLoad(idx)}
            />
        })}
    </section>
}
