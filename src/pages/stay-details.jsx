import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local'

export const StayDetails = () => {
    const [stay, setStay] = useState(null)
    const params = useParams()
    
    useEffect(() => {
        loadStay()
    }, [params.id])


    const loadStay = async () => {
        const stayId = params.stayId
        console.log('params', params);
        const stay = await stayService.getById(stayId)
        setStay(stay)
    }


    if (!stay) return <div>Loading...</div>
    return (
        <section className="stay-details">
            <section>
                <h3>Name: {stay.name}</h3>
            </section>
            <section>
                <h3>Price: {stay.price}</h3>
            </section>
            <section>
                <h3>
                    Labels:
                    <ul>
                        {stay.labels &&
                            stay.labels.map((label) => <li key={label}>{label}</li>)}
                    </ul>
                </h3>
            </section>
        </section>
    )
}
