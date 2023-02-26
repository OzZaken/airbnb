import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// actions
import { updateView } from '../../store/app.actions'
import { loadStays, removeStay, } from '../../store/stay.action'
// cmps
import { StayList } from '../../cmps/stay/stay-list'
import { iconService } from '../../services/svg.service'
// UI
// import { UNMOUNTED } from 'react-transition-group/Transition'

export const StayApp = (props) => {
    const { stays, filterBy } = useSelector(state => state.stayModule)
    const dispatch = useDispatch()

    // VIEW
    useEffect(() => {
        //  -   mount
        dispatch(loadStays())
        dispatch(updateView('home'))
        //  -   -   ux ui
        document.body.classList.add('home-page')
        setTimeout(() => { document.title = `${iconService.Logo()} Home` }, 2000)
        //  -   unmount
        return () => {
            document.body.classList.remove('home-page')
            document.title = 'Bye Home!'
        }
    }, [])

    useEffect(() => {
        dispatch(loadStays())
    }, [filterBy])

    const onRemoveStay = (stayId) => {
        dispatch(removeStay(stayId))
    }

    const getStayAvgRate = (reviews) => {
        const rates = []
        reviews.forEach(review => rates.push(review.rate))
        return (rates.reduce((a, b) => (a + b)) / rates.length).toFixed(2)
    }
    // getStayAvgRate={getStayAvgRate}
    if (!stays) return <h1>!stays Loading...</h1>
    return <section className='home-page' >
        <StayList onRemoveStay={onRemoveStay} stays={stays} />
    </section>
}