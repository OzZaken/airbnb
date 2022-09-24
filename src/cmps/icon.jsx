//  Global 
import Logo from '../assets/img/logo.svg'
import Airbnb from '../assets/img/airbnb.svg'
import IosShareIcon from '@mui/icons-material/IosShare'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

// Unused
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//  Achievements 
import WifiIcon from '@mui/icons-material/Wifi'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

// Amenities 

//  Filter 
import { RiCactusLine } from 'react-icons/ri'
import { BiUserCheck } from 'react-icons/bi'
import SurfingIcon from '@mui/icons-material/Surfing'

const icons = {
    // Global 
    "logo": <img src={Logo} alt="Logo image" />,
    "airbnb": <Airbnb />,
    "share": <IosShareIcon />,
    "star": <StarIcon />,
    "heart": <FavoriteBorderIcon />,
    "heartFill": <FavoriteIcon />,
    "search": <SearchIcon />,
    "menu": <MenuIcon />,
    "accountCircle": <AccountCircleIcon />,
    "arrowForward": <ArrowCircleRightIcon />,
    "arrowBack": <ArrowCircleLeftIcon />,
    "air-cover": <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="Air cover image" />,
    "arrowDown": <svg viewBox="0 0 320 512" width="100" title="angle-down"> <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" /></svg>,
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
    "cactus": <RiCactusLine />,
    "surfing": <SurfingIcon />,

}
export default function AppIcon({ iconKey }) {
    return icons[iconKey]
}
// https://mui.com/material-ui/material-icons