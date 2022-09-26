import { useState } from 'react'
import { useFormRegister } from '../../hooks/useFormRegister'
import AppIcon from '../app-icon'
import { BtnTrigger } from '../helper/btn-radial-gradient'

export const StayOrder = ({ stay, stayAvgRate }) => {
    const [orders, setOrders] = useState(null)
    const [order, setOrder] = useState([
        {
            checkIn: new Date(),
            checkOut: new Date(),
            guests: 1,
        }
    ])
    const [register] = useFormRegister([
        {
            checkIn: new Date(),
            checkOut: new Date(),
            guests: 1,
        }
    ])

    // const putDateString = () => {
    //     checkIn.innerText = state[0].startDate.toString().slice(0, 15)
    //     checkOut.innerText = state[0].endDate.toString().slice(0, 15)
    // }

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
                        <label htmlFor="checkIn">
                            CHECK IN
                            {/* <input
                                name="checkIn"
                                {...register('date', 'date')} /> */}
                        </label>

                    </div>
                    <div className="date-input">
                        <label htmlFor="checkOut">
                            CHECK Out
                            {/* <input
                                name="checkOut"
                                {...register('date', 'date')} /> */}
                        </label>
                    </div>
                </div>

                <div className="guest-input">
                    <label htmlFor="guests">
                        GUESTS
                        {/* <input type="number"
                            {...register('number', 'number')} /> */}
                    </label>
                    <AppIcon onClick={()=>{console.log('// TODO:use htmlFor');}} iconKey='arrowDown' />
                </div>
            </div>

            <BtnTrigger />
            <div>You won't be charged yet</div>

        </div>
    </section>
}

// https://codepen.io/emoyal4/pen/NWjrmzv
 // https://www.carlrippon.com/repeat-element-n-times-in-jsx/