import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// actions
import { setView } from '../../store/actions/app.actions'
import { loadStays, removeStay,  } from '../../store/actions/stay.action'
// cmps
import { StayList } from '../../cmps/stay/stay-list'
// import { UNMOUNTED } from 'react-transition-group/Transition'

export const StayApp = (props) => {
    const { stays } = useSelector(state => state.stayModule)
    const { filterBy } = useSelector(state => state.stayModule)
    const dispatch = useDispatch()

    // VIEW
    useEffect(() => {
        //  -   mount
        dispatch(loadStays())
        dispatch(setView('home'))
        //  -   -   ux ui
        document.body.classList.add('home-page')
        setTimeout(() => { document.title = '$i Home' }, 2000)

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

    if (!stays) return <h1>!stays Loading...</h1>
    return <section className='full home-page' >
        <StayList history={props.history} onRemoveStay={onRemoveStay} stays={stays} />
    </section>
}