import React, { useEffect } from 'react'
import { useRef } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import AppIcon from "./icon"

// CMPS
import { LoginSignup } from './login-signup.jsx'
import { StayFilter } from './stay/filter.jsx'

function _AppHeader({ onLogin, onSignup, onLogout, user }) {
    const isFilterShown = false

    //? Using with navigate from the Header or just link?
    const navigate = useNavigate()

    useEffect(() => {
        // console.log('location:', location)
        // console.log('navigate:', navigate)
    }, [])

    // For Show heading "NavLinks"
    const ref = useRef()
    const onSelectFocus = () => {
        // isFilterShown = true

            // // try1
            // console.log('focusOn', focusOn.target.value)
            // // try2
            // ref.current = focusOn
            // // try3
            // isSelectedFilterBy = !isSelectedFilterBy
    }

    
    return <header className='main-container space-between'>
          {/* {isLoggedIn
             ? <LogoutButton onClick={this.handleLogoutClick} />
             : <LoginButton onClick={this.handleLoginClick} />
           } */}

        <div className='flex space-between main-header'>
            <Link className="logo" to={'/'}>
                <AppIcon iconKey="logo" />
            </Link>

            <div className='flex filter-btns-container'>
                <div className='flex space-between btns-container'>
                    <button onClick={()=>{onSelectFocus('anywhere')}}>AnyWhere</button>
                    <button onClick={()=>{onSelectFocus('anyweek')}}>Any Week</button>

                    <div className='flex center space-evenly'>
                        <div>
                            <button onClick={()=>{onSelectFocus('addguests')}}>
                                Add guests
                            </button>
                        </div>
                        <div className="circle fill2">
                            <AppIcon iconKey="search" />
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex user-btns-container">
                <Link to={`/stay/edit`}>Become a host</Link>
                <AppIcon iconKey="menu" />
                <AppIcon iconKey="accountCircle" />
            </div>
        </div>
        {isFilterShown && <StayFilter />}

        {/* {user &&
                <span className="user-info">
                    <Link to={`user/${user._id}`}>
                    {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                    </Link>
                    <span className="score">{user.score?.toLocaleString()}</span>
                    <button onClick={onLogout}>Logout</button>
                    </span>
                }
                
                {!user &&
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