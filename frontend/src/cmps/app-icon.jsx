import Airbnb from '../assets/imgs/svg/airbnb.svg'
import Flag from '@mui/icons-material/Flag';
import IosShareIcon from '@mui/icons-material/IosShare'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import TuneIcon from '@mui/icons-material/Tune';
import { Inbox } from '@mui/icons-material'
import WifiIcon from '@mui/icons-material/Wifi'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SurfingIcon from '@mui/icons-material/Surfing'
import AmazingPool from '../assets/imgs/filter-by/amazing-pool.png'
import AmazingViews from '../assets/imgs/filter-by/amazing-views.png'
import Arctic from '../assets/imgs/filter-by/arctic.png'
import Beach from '../assets/imgs/filter-by/beach.png'
import Camping from '../assets/imgs/filter-by/camping.png'
import Design from '../assets/imgs/filter-by/design.png'
import Island from '../assets/imgs/filter-by/island.png'
import NationalPark from '../assets/imgs/filter-by/national-park.png'
import Omg from '../assets/imgs/filter-by/omg.png'


export default function OnlyIcon({ iconKey }) {
  return icons[iconKey]
}

export function ContainIcon({ iconKey, size }) {
  const icon = icons[iconKey]
  return <span className={'icon-container ' + size}>
    {icon}
  </span>
}

export function CustomSvg(props) {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
      <path d={props.path} />
    </svg>
  )
}

const icons = {
  AccountCircle: <AccountCircleIcon />,
  Airbnb: <Airbnb />,
  airCover: <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="Air cover" />,
  amazingPool: <img alt='Amazing pool' src={AmazingPool} />,
  amazingViews: <img alt='Amazing views' src={AmazingViews} />,
  AngleDown: <svg viewBox="0 0 320 512" width="100" title="angle-down"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" /></svg>,
  arctic: <img alt='Arctic' src={Arctic} />,
  ArrowDown: <svg viewBox="0 0 320 512" width="100" title="angle-down"> <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" /></svg>,
  ArrowCircleRight: <ArrowCircleRightIcon />,
  ArrowCircleLeft: <ArrowCircleLeftIcon />,
  beach: <img alt='Beach' src={Beach} />,
  camping: <img alt='Camping' src={Camping} />,
  design: <img alt='Design' src={Design} />,
  FilterBy: <TuneIcon />,
  flag: <Flag />,
  footerSvg: <svg width="26" height="12" fill="none"><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" fill="#fff"></rect><path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path><path d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5" stroke="#06F" strokeLinecap="round"></path><path d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5" stroke="#fff" strokeLinecap="round"></path><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" stroke="#06F"></rect></svg>,
  Favorite: <FavoriteBorderIcon />,
  FavoriteFill: <FavoriteIcon />,
  GreatLoc: <WhereToVoteOutlinedIcon />,
  GreatCheckIn: <AssignmentTurnedInOutlinedIcon />,
  Hamburger: <MenuIcon />,
  inbox: <Inbox />,
  island: <img alt='Island' src={Island} />,
  KeyboardArrowRight: <KeyboardArrowRightIcon />,
  KeyboardArrowLeft: <KeyboardArrowLeftIcon />,
  KeyboardArrowLeft1: <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; strokeWidth: 5.33333; overflow: visible;"><g fill="none"><path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932" /></g></svg>,
  Logo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="#f44336" d="M22.517 16.886c-.813-1.725-2.018-4.264-3.243-6.846-1.364-2.877-2.754-5.808-3.66-7.73C14.954.907 13.535 0 12 0S9.046.907 8.385 2.31c-.92 1.954-2.342 4.952-3.729 7.875-1.201 2.532-2.376 5.008-3.175 6.702A4.94 4.94 0 0 0 1 19c0 2.757 2.243 5 5 5 1.873 0 4.114-1.343 6-3.234C13.886 22.657 16.127 24 18 24c2.757 0 5-2.243 5-5 0-.724-.163-1.435-.483-2.114zM9 13c0-1.654 1.346-3 3-3s3 1.346 3 3c0 2.002-1.293 4.356-3 6.277-1.707-1.921-3-4.275-3-6.277zm9 10c-1.507 0-3.543-1.235-5.299-2.981C14.606 17.864 16 15.201 16 13c0-2.206-1.794-4-4-4s-4 1.794-4 4c0 2.201 1.394 4.864 3.299 7.019C9.543 21.765 7.507 23 6 23c-2.206 0-4-1.794-4-4 0-.575.13-1.143.387-1.688.798-1.692 1.973-4.168 3.173-6.7C6.947 7.689 8.369 4.69 9.29 2.735 9.786 1.681 10.85 1 12 1s2.214.681 2.71 1.735c.905 1.923 2.296 4.855 3.661 7.732 1.225 2.582 2.428 5.12 3.242 6.845.257.545.387 1.113.387 1.688 0 2.206-1.794 4-4 4z" /><linearGradient id="a" x1="4.675" x2="23.584" y1="10.039" y2="18.856" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" stopOpacity=".2" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient><path fill="url(#a)" d="M22.517 16.886c-.813-1.725-2.018-4.264-3.243-6.846-1.364-2.877-2.754-5.808-3.66-7.73C14.954.907 13.535 0 12 0S9.046.907 8.385 2.31c-.92 1.954-2.342 4.952-3.729 7.875-1.201 2.532-2.376 5.008-3.175 6.702A4.94 4.94 0 0 0 1 19c0 2.757 2.243 5 5 5 1.873 0 4.114-1.343 6-3.234C13.886 22.657 16.127 24 18 24c2.757 0 5-2.243 5-5 0-.724-.163-1.435-.483-2.114zM9 13c0-1.654 1.346-3 3-3s3 1.346 3 3c0 2.002-1.293 4.356-3 6.277-1.707-1.921-3-4.275-3-6.277zm9 10c-1.507 0-3.543-1.235-5.299-2.981C14.606 17.864 16 15.201 16 13c0-2.206-1.794-4-4-4s-4 1.794-4 4c0 2.201 1.394 4.864 3.299 7.019C9.543 21.765 7.507 23 6 23c-2.206 0-4-1.794-4-4 0-.575.13-1.143.387-1.688.798-1.692 1.973-4.168 3.173-6.7C6.947 7.689 8.369 4.69 9.29 2.735 9.786 1.681 10.85 1 12 1s2.214.681 2.71 1.735c.905 1.923 2.296 4.855 3.661 7.732 1.225 2.582 2.428 5.12 3.242 6.845.257.545.387 1.113.387 1.688 0 2.206-1.794 4-4 4z" /></svg>,
  Menu: <MenuIcon />,
  nationalPark: <img alt='National park' src={NationalPark} />,
  omg: <img alt='Alien spaceship' src={Omg} />,
  Star: <StarIcon />,
  SuperHost: <WorkspacePremiumOutlinedIcon />,
  Share: <IosShareIcon />,
  Search: <SearchIcon />,
  SearchBy: <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>,
  surfing: <SurfingIcon />,
  Wifi: <WifiIcon />,
}

// debug
window.gDebugIcons = icons