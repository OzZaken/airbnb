import { stayService } from '../../services/stay.service.local'
import { BtnTrigger } from '../btn-trigger'
import { StayRate } from './props/rate'

export const StayOrder = ({ stay }) => {
    if (!stay) return
    // const [register] = useFormRegister(
    // )
    // useEffect(() => {
    // }, [])

    return <section className='stay-order'>
        <div className='flex column order-container'>
            <div className='flex space-between'>
                {`$ ${stay.price} night`}
                <StayRate reviews={stay.reviews} />
            </div>
            <input type='date' name='order' id='order' />
            <BtnTrigger/>
            <span>You won't be charged yet</span>
            <button className='capitalize underline'></button>
            <button className='capitalize underline'></button>
        </div>
    </section>
}