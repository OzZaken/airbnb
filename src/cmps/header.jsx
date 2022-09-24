import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import AppIcon from "./icon"

// CMPS
import { LoginSignup } from './login-signup.jsx'
import { StayFilter } from './stay/stay-filter.jsx'

function _AppHeader({ onLogin, onSignup, onLogout, user }) {
    // useState
    let isFilterShown = false
    useEffect(() => {
    }, [isFilterShown])

    // For Show heading "NavLinks"
    const ref = useRef()
    const onSelectFocus = (focusOn) => {
        isFilterShown = false
        console.log('focusOn:', focusOn)
    }

    return <header className='main-container space-between'>

        <div className='flex space-between main-header'>
            {/* Logo */}
            <Link className="logo" to={'/'}>
                <AppIcon iconKey="logo" />
            </Link>
            {/* filter */}
            <div className='flex center filter-btns-container'>
                <div className='flex space-between btns-container'>
                    <button onClick={() => { onSelectFocus('location') }}>AnyWhere</button>
                    <button onClick={() => { onSelectFocus('date') }}>Any Week</button>
                    <div className='flex center space-evenly'>
                        <div>
                            <button onClick={() => { onSelectFocus('guests') }}>
                                Add guests
                            </button>
                        </div>
                        <div className="circle fill2">
                            <AppIcon iconKey="search" />
                        </div>

                    </div>
                </div>
            </div>
            {/* User */}
            <div className="flex space-between user-btns-container">
                <div className='flex center left'><Link to={`/stay/edit`}>Become a host</Link></div>
                <div className='flex user-nav-container'>
                    <AppIcon iconKey="menu" />
                    <AppIcon iconKey="accountCircle" />
                </div>
            </div>
        </div>
        {isFilterShown && <StayFilter />}

        {user &&
            <span className="user-info">
                <Link to={`user/${user._id}`}>
                    {user.imgUrl && <img src={user.imgUrl} />}
                    {user.fullname}
                </Link>
                <span className="score">{user.score?.toLocaleString()}</span>
                <button onClick={onLogout}>Logout</button>
            </span>
        }

        {/* {!user &&
            <section className="user-info">
                <LoginSignup onLogin={onLogin} onSignup={onSignup} />
            </section>
            } */}

    </header >
}

function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        user: state.userModule.user,
        count: state.userModule.count,
        isLoading: state.systemModule.isLoading
    }
}

const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)