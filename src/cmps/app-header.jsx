import React from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import logo from '../assets/img/airbnb2.svg'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
                // width="50px" height={'50px'}
                />
            </Link>

            <div className="header-filter">
                <div className="location">
                    <p>Location</p>
                    <input type="text" placeholder="Where are you going?"/>
                </div>
                <div className="check-in">
                    <p>Check in</p>
                    <input type="text" placeholder="Add dates"/>
                </div>
                <div className="check-out">
                    <p>Check out</p>
                    <input type="text" placeholder="Add dates"/>
                </div>
                <div className="guests">
                    <p>Guests</p>
                    <input type="text" placeholder="Add guests"/>
                        <span><SearchIcon className="search-icon" /></span>
                </div>
            </div>

            {/* <div className="header-filter">
                <form>
                    <div className='location-input'>
                        <label htmlFor="anywhere">Anywhere</label>
                        <input type="text" placeholder="Where are you going?" />
                    </div>
                    <div>
                        <label htmlFor="check-in">Check in</label>
                        <input type="text" placeholder="Add Date" />
                    </div>
                    <div>
                        <label htmlFor="check-out">Check out</label>
                        <input type="text" placeholder="Add Date" />
                    </div>
                    <div>
                        <label htmlFor="guest">Guest</label>
                        <input type="text" placeholder="Add Guest" />
                    </div>
                    <button><SearchIcon className="search-icon" /></button>

                </form>
            </div> */}

            <div className="user-btns-container">
                <Link className="header-host-btn" to={`/stay/edit`} >
                    <p>Become a host</p>
                </Link>
                <Link className="btn-user-options">
                    <MenuIcon />
                    <AccountCircleIcon />
                </Link>
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

        </header >
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




