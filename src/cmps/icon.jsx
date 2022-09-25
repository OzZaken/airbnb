// App
import Logo from '../assets/img/logo.svg'
import Airbnb from '../assets/img/airbnb.svg'
//  Global 
import IosShareIcon from '@mui/icons-material/IosShare'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

//  Achievements 
import WifiIcon from '@mui/icons-material/Wifi'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

// Amenities 

//  FilterBy 
import { RiCactusLine } from 'react-icons/ri'
import { BiUserCheck } from 'react-icons/bi'
import SurfingIcon from '@mui/icons-material/Surfing'
import AmazingPool from '../assets/img/filter-icons/amazing-pool.png'
import AmazingViews from '../assets/img/filter-icons/amazing-views.png'
import Arctic from '../assets/img/filter-icons/arctic.png'
import Beach from '../assets/img/filter-icons/beach.png'
import Camping from '../assets/img/filter-icons/camping.png'
import Design from '../assets/img/filter-icons/design.png'
import Island from '../assets/img/filter-icons/island.png'
import NationalPark from '../assets/img/filter-icons/national-park.png'
import Omg from '../assets/img/filter-icons/omg.png'

const icons = {
    // Global 
    "logo": <img src={Logo} alt="Logo image" />,
    "airbnb": <Airbnb />,
    "share": <IosShareIcon />,
    "star": <StarIcon />,
    "heart": <FavoriteBorderIcon />,
    "heartFill": <FavoriteIcon />,
    "heartFill2": <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: #f40909; stroke: #f40909; stroke-width: 2; overflow: visible;"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"/></svg>,
    "search": <SearchIcon />,
    "menu": <MenuIcon />,
    "accountCircle": <AccountCircleIcon />,
    "arrowForward": <ArrowCircleRightIcon />,
    "arrowRight": <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: #00000080; stroke: #ffffff; stroke-width: 2; overflow: visible;"><path d="m 16 28 c 7 -4.733 14 -10 14 -17 c 0 -1.792 -0.683 -3.583 -2.05 -4.95 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 l -2.051 2.051 l -2.05 -2.051 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 c -1.367 1.367 -2.051 3.158 -2.051 4.95 c 0 7 7 12.267 14 17 Z"/></svg>,

    "arrowBack": <ArrowCircleLeftIcon />,
    "air-cover": <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="Air cover image" />,
    "arrowDown": <svg viewBox="0 0 320 512" width="100" title="angle-down"> <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" /></svg>,
    "filterBy": <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:block;height:14px;width:14px;fill:currentColor" aria-hidden="true" role="presentation" focusable="false"><path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /></svg>,
    "btnLeft": <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><g fill="none"><path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932" /></g></svg>,
    "arrowLeft": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ffffff" d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.4,16.6L10.8,12L15.4,7.4L14,6L8,12L14,18L15.4,16.6Z" /></svg>,
    
    // Achievements
    "fastWifi": <WifiIcon />,
    "superHost": <WorkspacePremiumOutlinedIcon />,
    "greatLoc": <WhereToVoteOutlinedIcon />,
    "greatCheckIn": <AssignmentTurnedInOutlinedIcon />,
    "workspace": '',
    "selfCheckIn": <BiUserCheck />,
    "petsFriendly": '',
    // Amenities 
    "Shampoo": '',
    // Filter:
    "desert": <RiCactusLine />,
    "surfing": <SurfingIcon />,
    "amazingPool": <img alt='Amazing pool image' src={AmazingPool} />,
    "amazingViews": <img alt='Amazing views image' src={AmazingViews} />,
    "arctic": <img alt='Arctic image' src={Arctic} />,
    "beach": <img alt='Beach image' src={Beach} />,
    "camping": <img alt='Camping image' src={Camping} />,
    "design": <img alt='Design image' src={Design} />,
    "island": <img alt='Island image' src={Island} />,
    "nationalPark": <img alt='National park image' src={NationalPark} />,
    "omg": <img alt='Alien spaceship image' src={Omg} />,

}
export default function AppIcon({ iconKey }) {
    return icons[iconKey]
}
// https://mui.com/material-ui/material-icons