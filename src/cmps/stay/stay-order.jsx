import { useState } from 'react'
import { useFormRegister } from '../../hooks/useFormRegister'
import AppIcon from '../app-icon'
import { BtnTrigger } from '../helper/btn-radial-gradient'
import DatePicker from '../helper/date-picker'

export const StayOrder = ({ stay, stayAvgRate }) => {
    const [orders, setOrders] = useState(null)
    const [order, setOrder] = useState([
        {
            checkIn: new Date(),
            checkOut: new Date(),
            guests: 1,
        }
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const setCheckIn = (date) => {
        console.log('date:', date.getFullYear(), date.getMonth(), date.getDate())
        setOrder(prevOrder => (
            {
                ...prevOrder,
                checkIn: date + ''
            }
        ))
    }
    const setCheckOut = (date) => {
        console.log('date:', date.getFullYear(), date.getMonth(), date.getDate())
        setOrder(prevOrder => (
            {
                ...prevOrder,
                checkIn: date + ''
            }
        ))
    }

    // const putDateString = () => {
    //     checkIn.innerText = 
    //     checkOut.innerText = 
    // }


    return <section className='stay-order'>
        <div className='flex column order-container'>

            <div className="order-form-heading">
                <p>
                    <span className='prev-price'> {`${Math.ceil(stay.price / 3 + stay.price)} `}
                    </span>

                    <span className="cost">
                        {stay.price}
                    </span>
                    night
                </p>

                <p>{stayAvgRate} <AppIcon iconKey="star" />
                    <span className="reviews">
                        {`${stay.reviews.length - 1} reviews`}
                    </span>
                </p>
            </div>

            {/* Order Data */}
            <div className="order-data">
                <div className="date-picker">
                    <div onClick={() => { setIsModalOpen(true) }} className="check-in">
                        Check In
                        {order.checkIn}
                    </div>

                    <div onClick={() => { setIsModalOpen(true) }} className="check-out">
                        Check Out
                    </div>
                    {isModalOpen && <DatePicker setCheckIn={setCheckIn} />}
                </div>

                <div className="guest-input">
                    <label htmlFor="guests">
                        GUESTS
                        {/* <input type="number"
                            {...register('number', 'number')} /> */}
                    </label>
                    <AppIcon onClick={() => { console.log('// TODO:use htmlFor'); }} iconKey='arrowDown' />
                </div>
            </div>

            <BtnTrigger />

            <div>You won't be charged yet</div>
            {/*TODO: ↓ 
                {`${coin}${stay.price} X ${totalDays}  ${coin}${totalPrice}`} */}
            <div className='flex space-between'>
                <div className="left btn-link">
                    {`$${stay.price} X x  $y`}
                </div>
                <div className="right btn-link">
                    {`$${stay.price * 5} `}
                </div>
            </div>

        </div>
    </section>
}

// https://codepen.io/emoyal4/pen/NWjrmzv
 // https://www.carlrippon.com/repeat-element-n-times-in-jsx/