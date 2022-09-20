//  Global Page 
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

//  Achievements 
import WifiIcon from '@mui/icons-material/Wifi'

 // Amenities 

//  Filter 
import { RiCactusLine } from 'react-icons/ri'
import SurfingIcon from '@mui/icons-material/Surfing'

const icons = {
    // PAGE Basic Icons
    "share": <IosShareIcon />,
    "star": <StarRateIcon />,
    "heart": <FavoriteBorderIcon />,
    // Achievements
    "fastWifi": <WifiIcon />,
    "superHost": '',
    "greatLoc": '',
    "greatCheckIn": '',
    "workspace": '',
    "selfCheckIns": '',
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