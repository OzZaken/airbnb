// import { useEffect } from 'react'
// import { useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { stayService } from '../services/stay.service'

export const StayDetails = (props) => {

    // const [stay, setStay] = useState(null)
    // const params = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     loadStay()
    // }, [params.id])

    // // componentDidUpdate(prevProps, prevState) {
    // //     if (prevparams.id !== params.id) {
    // //         loadStay()
    // //     }
    // // }

    // const loadStay = () => {
    //     const stayId = params.id
    //     stayService.getById(stayId).then(stay => {
    //         setStay(stay)
    //     })
    // }

    // const onBack = () => {
    //     navigate('/')
    // }

    if (!stay) return <div>Loading...</div>
    return (
        <div className='stay-details'>
            <h2>stay-details</h2>
            {/* <button onClick={onBack}>Back</button> */}
            {/* <Link to='/stay/r1' >Next Stay</Link> */}
        </div>
    )
}
