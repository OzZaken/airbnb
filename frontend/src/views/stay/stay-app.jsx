import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
// Services
import { utilService } from '../../services/util.service'
// actions
import { updateView } from '../../store/app.actions'
import { loadStays, removeStay, setSortBy, updateStay } from '../../store/stay.action'
// cmps
import { StayList } from '../../cmps/stay/stay-list'
import { FilterByPrice } from '../../cmps/stay/filter-by/filter-by-price'
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
    useEffect(() => {dispatch(loadStays())}, [filterBy])

    const getStayAvgRate = (reviews) => {
        const rates = []
        reviews.forEach(review => rates.push(review.rate || utilService.getRandomFloatInclusive(1, 5, 2)))
        return (rates.reduce((a, b) => (a + b)) / rates.length).toFixed(2)
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
        {/* <FilterByPrice/> */}
        <StayList getStayAvgRate={getStayAvgRate} onChangeSortBy={onChangeSortBy} onUpdateStay={onUpdateStay} onRemoveStay={onRemoveStay} stays={stays} />
    </section>
}