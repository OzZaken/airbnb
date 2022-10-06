import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import AppIcon from "./app-icon"
import { userService } from "../services/user.service";
// CMPS
import { LoginSignup } from './login-signup.jsx'
import { StayFilter } from './stay/stay-filter.jsx'
import Divider from '@mui/material/Divider'

function _AppHeader({ onLogin, onSignup, onLogOut, user, loggedInUser }) {

    useEffect(() => {
        console.log('loggedInUser:', loggedInUser)
    }, [])

    // Filter Btns
    const [focusOn, setFocusOn] = useState(null)
    const ref = useRef()
    const onSelectFocus = (focusOn) => {
        setFocusOn(focusOn)
        // ref.current
    }

    //  User Nav
    const [isUserNavOpen, setIsUserNavOpen] = useState(false)
    function handleUserNav() {
        setIsUserNavOpen(!isUserNavOpen)
    }

    return <header className='space-between'>
        <div className='flex space-between main-container main-header'>
            {/* Logo */}
            <Link className="logo" to={'/'}>
                <AppIcon iconKey="logo" />
            </Link>

            {/* Filter Btns */}
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
                <div className='flex center left'>
                    <Link to={`/stay/edit`}>
                        Become a host
                    </Link>
                </div>
                <div onClick={handleUserNav} className='flex user-nav-container'>
                    <AppIcon iconKey="menu" />
                    <AppIcon iconKey="accountCircle" />
                </div>
                {isUserNavOpen &&
                    <div className='user-nav-container' onClick={handleUserNav}>
                        <nav>
                            <ul className='clean-list'>
                                {/* loggedInUser Condition → link to stay order || login\signup*/}
                                {loggedInUser ? (
                                    <li>
                                        <Link to={'stay/order'}
                                            className='user-nav-about-link'>
                                            <span className='user-nav-span'>
                                                {loggedInUser.firstname}
                                                {loggedInUser.lastname}
                                            </span>
                                        </Link>
                                        <Divider />
                                    </li>
                                ) : (
                                    <>
                                        <li><Link to={'login'}>Log in</Link>
                                        </li>

                                        <li><Link to={'signup'}>Sign up</Link>
                                        </li>
                                        <Divider />
                                    </>
                                )}

                                <hr />
                                <li>
                                    <Link to={'stay/host'}>Host your home</Link>
                                </li>
                                <li>
                                    <Link to={'stay/host'}>Host an experience</Link>
                                </li>

                                <li onClick={onLogOut}>
                                    {loggedInUser ? (
                                        <button className='user-nav-span'>Log out</button>
                                    ) : (
                                        <Link href='/about'>About</Link>
                                    )}
                                </li>

                            </ul>
                            <div className='user-nav-span'>Help</div>
                        </nav>
                    </div>
                }
            </div>
        </div>
        {/* Filter  */}
        <StayFilter />
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