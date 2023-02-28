import { useState, React } from 'react'
import { useSelector } from 'react-redux'
import AppIcon from './app-icon'
import userSvg from "../assets/imgs/svg/empty-user.svg"

export function UserMenu() {

   const [isUserModalOpen, setIsUserModalOpen] = useState(false)
   const user = useSelector((state) => state.userModule.user)
   console.log(`🚀 ~ user:`, user)

   function handleUserModal() {
      setIsUserModalOpen(!isUserModalOpen)
   }


   const imgProps = user ? { className: 'loggedInUser', src: user.imgUrl } : { className: 'user-svg', src: userSvg }
   return (
      <div className='user-menu'>
         <button className='btn-user-menu' onClick={handleUserModal}>
            <AppIcon className="hamburger-svg" iconKey="Hamburger" />
            &nbsp;
            <img {...imgProps} />
         </button>
      </div>
   )
}