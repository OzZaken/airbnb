import '../assets/styles/cmps/_host-summary.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { loadHostStays } from '../store/actions/stay.action.js'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-balham.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { OrdersTable } from '../cmps/host/orders-table'
import { loadReviews } from '../store/actions/review.actions'
import { ReviewsSummary } from '../cmps/host/reviews-summary'
import { OrdersSummary } from '../cmps/host/orders-summary'

export const Host = () => {
    const dispatch = useDispatch()

    const { id: hostId } = useParams()

    const stays = useSelector((state) => state.stayModule.hostStays)
    const user = useSelector((state) => state.userModule.user)
    const filterBy = useSelector((state) => state.stayModule.filterBy)

    useEffect(() => {
        dispatch({ type: 'SET_FILTER_BY', filterBy: { hostId } })
    }, [hostId])

    useEffect(() => {
        dispatch(loadHostStays())
    }, [filterBy?.hostId])

    useEffect(() => {
        if (!stays.length) {
            return
        }
        dispatch(loadOrders({ stayId: stays[0]._id }))
        dispatch(loadReviews({ stayId: stays[0]._id }))
    }, [stays])

    return (
        <div className='host-page-wrapper'>
            <div className='host-page-container'>
                <span className='host-header'>Hi {user?.firstname}! </span>
                <div className='host-container'>
                    <section className='orders-wrapper ag-theme-material'>
                        <OrdersTable />
                    </section>

                    <div className='summary-container'>
                        <ReviewsSummary />
                        <OrdersSummary />
                    </div>
                </div>
            </div>
        </div>
    )
}
