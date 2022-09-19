// MUI page Icons
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// MUI Achievements icons
import WifiIcon from '@mui/icons-material/Wifi'

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
}

export default function AppIcon({ iconKey }) {
    return icons[iconKey]
}