// MUI page Icons
import IosShareIcon from '@mui/icons-material/IosShare'
import StarRateIcon from '@mui/icons-material/StarRate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// MUI stayTitles icons
import WifiIcon from '@mui/icons-material/Wifi'

export function IconsValue(iconKey) {

    icons = {
        // PAGE Basic Icons
        "shareBtn": {
            "icon": <IosShareIcon />,
        },
        "starRate": {
            "icon": <StarRateIcon />,
        },
        "heart": {
            "icon": <FavoriteBorderIcon />,
        },


    }
    titles = {  // Stay titles, heading, txt and icon
        "fastWifi": {
            "heading": "Fast wifi",
            "txt": "At 62 Mbps, you can take video calls and stream videos for your whole group.",
            "icon": <WifiIcon />,
        },
        "superHost": {
            "heading": "is a Superhost",
            "txt": "Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.",
            "icon": "",
        },
        "greatLoc": {
            "heading": "Great location",
            "txt": "100% of recent guests gave the location a 5-star rating.",
            "icon": "",
        },
        "greatCheckIn": {
            "heading": "Great check-in experience",
            "txt": "100% of recent guests gave the check-in process a 5-star rating.",
            "icon": "",
        },
        "workspace": {
            "heading": "Dedicated workspace",
            "txt": "A private room with wifi that`s well-suited for working.",
            "icon": "",
        },
        "selfCheckIn": {
            "heading": "Self check-in",
            "txt": "You can check in with the doorman.",
            "icon": "",
        },
        "petsFriendly": {
            "heading": "Furry friends welcome",
            "txt": "Bring your pets along for the stay.",
            "icon": "",
        },
    }
    amenities = [
        // Stay amenities, txt for start icon later

    ]

    const getIcon = (iconKey) => {
        return icons[iconKey].icon
    }
    const getIconHeading = (iconKey) => {
        return icons[iconKey].heading
    }
    const getIconTxt = (iconKey) => {
        return icons[iconKey].txt
    }

    return ('txt' || <Icon />
        // <div className={`icon-${}`}  >

        // </div>
    )
}
