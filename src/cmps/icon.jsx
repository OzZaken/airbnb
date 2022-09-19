// MUI page Icons
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// MUI stayTitles icons
import WifiIcon from '@mui/icons-material/Wifi'

export function Icons(iconKey) {
    const icons = {
        // PAGE Basic Icons
        "share": <IosShareIcon />,
        "starRate": <StarRateIcon />,
        "heart": <FavoriteBorderIcon />,
        // Titles
        "fastWifi": '',
        "superHost": '',
        "greatLoc": '',
        "greatCheckIn": '',
        "workspace": '',
        "selfCheckIns": '',
        "petsFriendly": '',
        // Amenities 
        "Shampoo": '',
    }
    return icons[iconKey]
}
