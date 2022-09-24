import { useState } from 'react'
import { useFormRegister } from '../../hooks/useFormRegister'
import { stayService } from '../../services/stay.service.local'
// Cmps
import AppIcon from '../icon'
import { BtnTrigger } from '../helper/btn-radial-gradient'
export const StayOrder = ({ stay, stayAvgRate }) => {
    const [orders, setOrders] = useState(null)
    const [register] = useFormRegister([
        {
          startDate: new Date(),
          endDate: new Date(),
        }
      ])



    
    // const [register] = useFormRegister(
    // {
    //     checkIn: '',
    //     checkOut: '',

    // }
    //     )
    // useEffect(() => {
    // }, [])
    return <section className='stay-order'>
        <div className='flex column order-container'>

            <div className="order-form-header">
                <p>
                    <span className='prev-price'> {`${Math.ceil(stay.price / 3 + stay.price)} `}
                    </span>
                    
                    <span className="cost">{stay.price}
                    </span>
                    night
                </p>

                <p>{stayAvgRate} <AppIcon iconKey="star" />
                    <span className="reviews">
                        {`${stay.reviews.length - 1} reviews`}
                    </span>
                </p>
            </div>

            <div className="order-data">
                
                <div className="date-picker">
                    <div className="date-input">
                        <label>CHECK IN</label>


                    </div>
                    <div className="date-input">
                        <label>CHECK OUT</label>

                      
                    </div>
                </div>

                <div className="guest-input">
                    <label>GUESTS</label>



                    <AppIcon iconKey='arrowDown' />
                </div>
            </div>

            <BtnTrigger />
            <div>You won't be charged yet</div>
        </div>
    </section>
}

// https://codepen.io/emoyal4/pen/NWjrmzv
 // https://www.carlrippon.com/repeat-element-n-times-in-jsx/
// <div>
//                 <div className='flex space-between wrap'>
//                     <div>
//                         {/* ${stay.price + utilService.getRandomIntInclusive(stay.price / 3, stay.price / 2)} */}

//                         <span className='prev-price'> ${stay.price} night </span>
//                         ${Math.ceil(stay.price / 3 + stay.price)}
//                     </div>
                    // <StayRate
                    //     rate={stayAvgRate}
                    //     reviewsCount={stay.reviews.length - 1}
                    //     isReviewBtnShow={true}
                    // />
//                 </div>
//             </div>