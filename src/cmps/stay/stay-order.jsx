import React from 'react';
import { useEffect, useState } from 'react'

import AppIcon from '../app-icon'
import { BtnTrigger } from '../helper/btn-radial-gradient'

import { DateRangePicker, toMomentObject } from 'react-dates'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export const StayOrder = ({ stay, stayAvgRate }) => {
    // const [orders, setOrders] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [order, setOrder] = useState({
        startDate: toMomentObject(new Date()),
        endDate: toMomentObject(new Date(new Date().setDate(new Date().getDate() + 5))),
        guests: {
            adults: 1,
            kids: 0
        },
    })
    const [focusedInput, setFocusedInput] = useState(null)

    useEffect(() => {
        console.log(order)
    }, [order])

    const handleDatesChange = (startDate, endDate) => {
        setOrder({
            ...order,
            startDate: toMomentObject(startDate),
            endDate: toMomentObject(endDate)
        })
    }

    return <section className='stay-order'>
        <div className='flex column order-container'>

            <div className="order-form-heading">
                <p>
                    <span className='prev-price'>
                        {`${Math.ceil(stay.price / 3 + stay.price)} `}
                    </span>

                    <span className="cost">
                        {stay.price}
                    </span> night
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

                    <div onClick={() => { setIsModalOpen(true) }}>
                        <div className='flex space-between'>
                            <p> Check In</p>
                            <p>Check Out</p>
                        </div>
                        <div className='flex'>
                            <DateRangePicker
                                startDateId="startDate"
                                endDateId="endDate"
                                startDate={order.startDate}
                                endDate={order.endDate}
                                onDatesChange={({ startDate, endDate }) => handleDatesChange(startDate, endDate)}
                                focusedInput={focusedInput}
                                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                            />
                        </div>

                    </div>

                </div>

                <div className="guest-input">
                    <label htmlFor="guests">
                        GUESTS
                        {/* <input type="number"
                            {...register('number', 'number')} /> */}
                    </label>
                    <AppIcon iconKey='arrowDown'
                        onClick={() => { console.log(' TODO:use htmlFor') }} />
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
    </section >
}

// https://codepen.io/emoyal4/pen/NWjrmzv
 // https://www.carlrippon.com/repeat-element-n-times-in-jsx/