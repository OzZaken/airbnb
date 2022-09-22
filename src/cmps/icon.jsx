//  Global 
import Logo from '../assets/img/logo.svg'
import Airbnb from '../assets/img/airbnb.svg'
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'

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
    // "":</>,
    "logo": <img src={Logo} alt="Logo image" />,
    "airbnb":<Airbnb/>,
    "share": <IosShareIcon />,
    "star": <StarRateIcon />,
    "heart": <FavoriteBorderIcon />,
    "search": <SearchIcon />,
    "menu": <MenuIcon />,
    "accountCircle": <AccountCircleIcon />,
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