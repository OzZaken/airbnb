import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'

export const StayDetails = (props) => {

    const [stay, setStay] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [params.id])

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevparams.id !== params.id) {
    //         loadStay()
    //     }
    // }

    const loadStay = () => {
        const stayId = params.id
        stayService.getById(stayId).then(stay => {
            setStay(stay)
        })
    }

    // const onBack = () => {
    //     navigate('/')
    // }

    if (!stay) return <div>Loading...</div>
    return (
        <section className='stay-details'>
            <h1>stay-details</h1>

            <h1>{stay.name}</h1>
            
            <div className="gallery-container">
            </div>

            <h2>{`price: ${stay.price}`}</h2>




        </section>
    )
}
