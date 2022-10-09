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

function _AppHeader({ onLogin, onSignup, onLogOut, user }) {

    useEffect(() => {
        console.log('user:', user)
    }, [])

    // Filter Btns
    const [focusOn, setFocusOn] = useState(null)
    const onSelectFocus = (focusOn) => {
        setFocusOn(focusOn)
        // ref.current
    }

    //  User NavAria
    const [isUserNavExpended, setAriaExpended] = useState(false)
    const onChangeAriaExpended = () => setAriaExpended(!isUserNavExpended)

    return <header className='main-layout main-header'>
        <div className='flex space-between'>
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

            {/* User NavAria*/}
            <div className="flex space-between user-btns-container">
                <Link className='flex center left host-link' to={`/stay/edit`}>
                    Become a host
                </Link>

                <button className='flex btn-user-nav'
                    aria-expanded={isUserNavExpended}
                    onClick={() => { onChangeAriaExpended() }}
                >
                    <AppIcon iconKey="menu" />
                    {user ?
                        <img src={user.imgUrl} />
                        :
                        <AppIcon iconKey="accountCircle" />
                    }
                    {/* TODO: add event listeners 
                 ↓   onClick !this component → onChangeAriaExpended  */}
                    {isUserNavExpended &&
                        <nav className='user-nav-container'
                            onClick={onChangeAriaExpended}
                        >
                            <ul className='clean-list'>
                                {/* user Condition → link to stay order || login\signup*/}
                                {user ? (

                                    <li>
                                        <Link to={'stay/order'}
                                            className='user-nav-about-link'>
                                            <span className='user-nav-span'>
                                                {user.firstname}
                                                {user.lastname}
                                            </span>
                                        </Link>
                                        <Divider />
                                    </li>
                                ) : (
                                    <>
                                        <li><Link to={'login'}>Log in</Link></li>
                                        <li><Link to={'signup'}>Sign up</Link></li>
                                    </>
                                )}
                                <hr />
                                <li><Link to={'stay/host'}>Host your home</Link></li>
                                <li><Link to={'stay/host'}>Host an experience</Link></li>
                                {/* TODO: ask why onClick now on the btn? */}
                                <li onClick={() => onLogOut()}>
                                    {user ? (
                                        <button className='user-nav-span'>Log out</button>
                                    ) : (
                                        <Link href='/about'>About</Link>
                                    )}
                                </li>
                                <li><Link to={'help'}>Help</Link></li>
                            </ul>
                        </nav>
                    }
                </button>
            </div>
        </div>
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