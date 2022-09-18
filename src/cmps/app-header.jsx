import React from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import logo from '../assets/img/airbnb1.svg'

function _AppHeader({ onLogin, onSignup, onLogout, user }) {
    // const navigate = useNavigate()

    // const onClickBecomeHost = () => {
    //     navigate('/stay/edit')
    // }

    return (
        <header className="app-header">

            <Link className="logo" to={'/'}>
                <img src={logo}
                    alt="Logo image"
                    width="50px" height={'50px'}
                />
            </Link>

            <div className="header-filter">
                header-filter
            </div>

            <div className="user-btns-container">

                <Link to={`/stay/edit`} >
                    Become a host
                </Link>
                <span className="btn-user-options">
                    menuBar | userImg
                </span>
            </div>


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
        </header>
    )
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