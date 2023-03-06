import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { utilService } from '../services/util.service'
import { setTitle, updateView } from '../store/system.actions'
import { loadStays, removeStay, setSortBy, updateStay } from '../store/stay.action'
import { StayList } from '../cmps/stay-list'
// import { UNMOUNTED } from 'react-transition-group/Transition'

export const StayApp = (props) => {
    const dispatch = useDispatch()
    const { stays, filterBy } = useSelector(state => state.stayModule)

    // const currentUrl = window.location.href
    // const [searchParams, setSearchParams] = useSearchParams()

    // console.log(`🚀 ~ props:`, props)
    // console.log(`🚀 ~ currentUrl:`, currentUrl)
    // console.log(`🚀 ~ searchParams:`, searchParams)
    // console.log(`🚀 ~ filterBy:`, filterBy, 'props', props)

    useEffect(() => {
        dispatch(loadStays())
        dispatch(updateView('home'))
        document.body.classList.add('home-page')
       
        let loading = 'loading'
        const intervalId = setInterval(() => {
            document.title = loading += '.'
            console.log(`🚀 ~ document.title:`, document.title)
            if (loading.length >= 3) clearInterval(intervalId)
        }, 500)

        return () => {
            document.body.classList.remove('home-page')
            clearInterval(intervalId)
        }
    }, [])

    // Update on change filterBy
    useEffect(() => { dispatch(loadStays()) }, [filterBy])

    const getStayAvgRate = (reviews) => {
        let reviewsCount
        reviewsCount = reviews.length
        return reviews.reduce((acc, review) => acc + review.rate, 0) / reviewsCount
    }

    const onChangeSortBy = (sortBy) => {
        dispatch(setSortBy(sortBy))
    }

    const onRemoveStay = (stayId) => {
        dispatch(removeStay(stayId))
    }

    const onUpdateStay = (stay) => {
        dispatch(updateStay(stay))
    }

    if (!stays) return <h1>!stays Loading...</h1>
    return <section className='home-page' >
        <StayList getStayAvgRate={getStayAvgRate} onChangeSortBy={onChangeSortBy} onUpdateStay={onUpdateStay} onRemoveStay={onRemoveStay} stays={stays} />
    </section>
}