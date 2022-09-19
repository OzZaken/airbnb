// MUI page Icons
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// MUI stayTitles icons
import WifiIcon from '@mui/icons-material/Wifi'


const icons = {
    // PAGE Basic Icons
    "share": <IosShareIcon />,
    "starRate": <StarRateIcon />,
    "heart": <FavoriteBorderIcon />,
    // Titles
    "fastWifi": <WifiIcon/>,
    "superHost": '',
    "greatLoc": '',
    "greatCheckIn": '',
    "workspace": '',
    "selfCheckIns": '',
    "petsFriendly": '',
    // Amenities 
    "Shampoo": '',
}


export function getIcon(iconKey) {
    return icons[iconKey]
}