import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

function _AppHeader({ onLogin, onSignup, onLogout, user }) {

    return (
        <header className="app-header">

            <div className="logo">logo airBnb</div>


            <div className="btns-filter-container">
                Anywhere
            </div>

<div className="btns-user-container">
    <button>Switch to hosting</button>
   
<div className="btn-user-options">
    menuBar
    userImg
</div>
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