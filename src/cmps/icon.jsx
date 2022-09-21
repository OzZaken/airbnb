//  Global Page 
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

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
    // PAGE Basic Icons
    "share": <IosShareIcon />,
    "star": <StarRateIcon />,
    "heart": <FavoriteBorderIcon />,
    // Achievements
    "fastWifi": <WifiIcon />,
    "superHost": <WorkspacePremiumOutlinedIcon/>,
    "greatLoc": <WhereToVoteOutlinedIcon/>,
    "greatCheckIn": <AssignmentTurnedInOutlinedIcon/>,
    "workspace": '',
    "selfCheckIn": <BiUserCheck/>,
    "petsFriendly": '',
    // Amenities 
    "Shampoo": '',
    // Filter:
    "cactus": <RiCactusLine />,
    "surfing":<SurfingIcon/>,

}
export default function AppIcon({ iconKey }) {
    return icons[iconKey]
}