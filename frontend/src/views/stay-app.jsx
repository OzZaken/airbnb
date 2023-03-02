import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
// Services
import { utilService } from '../services/util.service'
// actions
import { updateView } from '../store/app.actions'
import { loadStays, removeStay, setSortBy, updateStay } from '../store/stay.action'
// cmps
import { StayList } from '../cmps/stay-list'
// UI
// import { UNMOUNTED } from 'react-transition-group/Transition'

export const StayApp = (props) => {
    const { stays, filterBy } = useSelector(state => state.stayModule)
    const dispatch = useDispatch()

    // const currentUrl = window.location.href
    // const [searchParams, setSearchParams] = useSearchParams()

    // console.log(`🚀 ~ props:`, props)
    // console.log(`🚀 ~ currentUrl:`, currentUrl)
    // console.log(`🚀 ~ searchParams:`, searchParams)
    // console.log(`🚀 ~ filterBy:`, filterBy, 'props', props)

    // cdn cwum
    useEffect(() => {
        dispatch(updateView('home'))
        dispatch(loadStays())
        document.body.classList.add('home-page')
        setTimeout(() => { document.title = `Home` }, 3000)

        return () => {
            document.body.classList.remove('home-page')
            document.title = 'Bye Home!'
        }
    }, [])

    // Update on change filterBy
    useEffect(() => { dispatch(loadStays()) }, [filterBy])

    const getStayAvgRate = (reviews) => {
        let reviewsCount
        reviewsCount = reviews.length
        return reviews.reduce((acc, review) =>  acc + review.rate, 0) / reviewsCount
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