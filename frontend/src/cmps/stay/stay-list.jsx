import { useState, useRef, useEffect } from 'react'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'
import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, setAvgRate, onToggleIsInWishlist, onClickPreviewImg,getRange }) {
    const [isIntersecting, setIsIntersecting] = useState(false)
    useEffectUpdate(() => {
        console.log('prices:', getRange('price'))
        console.log('capacities:', getRange('capacity'))
    }, [])
    const ref = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {

            setIsIntersecting(entry.isIntersecting)

        }, { threshold: 1 })

        if (ref.current) {
            console.log(`🚀 ~ ref.current:`, ref.current)
            observer.observe(ref.current)
        }

        return () => observer.disconnect()

    }, [])

    const setIntersection = () => {
        const elStays = document.querySelectorAll('.stay-preview')

        const observer = new IntersectionObserver(
            entry => { /* cb toggle .show if stay is Intersecting */

                entry.target.classList.toggle('show', entry.isIntersecting)
                /* opt ~ if already visiable STOP observe*/
                // if (entry.isIntersecting) observer.unobserve(entry.target)
            },
            {
                threshold: 1,
                rootMargin: '100px', /* getting new stays when user get 100px from bottom of the page */
            })

        elStays.forEach(stay => {
            observer.observe(stay)
        })

        /* Toggle .show if stay is Intersecting */
        const elLastStayObserver = new IntersectionObserver(entries => {
            const lastCard = entries[0]
            if (!lastCard.isIntersecting) return
            // loadMoreStays()// dispatch({ type: 'INC_PAGE_IDX' }) // get 20 stays that already exits and load from the Api more 20 

            /* */
            elLastStayObserver.unobserve(lastCard.target)
            // lastCardObserver.observe(document.querySelector('.stay-preview:last-child'))
        }, {})

        elLastStayObserver.observe(document.querySelector('.stay-preview:last-child'))
    }

    return <section ref={ref.current} className='stay-list'>
        {stays.map(stay => {
            return <StayPreview
                key={stay._id}
                isIntersecting={isIntersecting}
                stay={stay}
                onRemoveStay={onRemoveStay}
                onClickPreviewImg={onClickPreviewImg}
                onToggleIsInWishlist={onToggleIsInWishlist}
                setAvgRate={setAvgRate}
            />
        })}
    </section>
}

