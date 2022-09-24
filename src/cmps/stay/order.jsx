import { stayService } from '../../services/stay.service.local'
import { StayRate } from './props/rate'
import { BtnTrigger } from '../helper/btn-radial-gradient'
export const StayOrder = ({ stay }) => {
    if (!stay) return
    // const [register] = useFormRegister(
    // )
    // useEffect(() => {
    // }, [])

    return <section className='stay-order'>
        <div className='flex column order-container'>
            <StayRate
                rate={stay.reviews.rate}
                reviewsCount={stay.reviews.length - 1}
                isReviewBtnShow={true}
            />
          <BtnTrigger/>
            <div>You won't be charged yet</div>
            <button className='btn-link'></button>
            <button className='btn-link'></button>
        </div>
    </section>
}

// https://codepen.io/emoyal4/pen/NWjrmzv
// https://www.carlrippon.com/repeat-element-n-times-in-jsx/