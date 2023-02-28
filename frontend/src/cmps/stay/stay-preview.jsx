import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { ImgGallery } from '../img-gallery'
import { utilService } from '../../services/util.service'
import AppIcon from '../app-icon'
import { locService } from '../../services/loc.service'
import { userService } from '../../services/user.service'

const properties = [
    "Cable TV",
    "Internet",
    "Wifi",
    "Air conditioning",
    "Pool",
    "Kitchen",
    "Free parking on premises",
    "Elevator",
    "Free street parking",
    "Family/kid friendly",
    "Washer",
    "Dryer",
    "Smoke detector",
    "First aid kit",
    "Essentials",
    "Hangers",
    "Hair dryer",
    "Iron",
    "Laptop friendly workspace",
    "Self check-in",
    "Lockbox",
    "Babysitter recommendations",
    "Hot water",
    "Bed linens",
    "Extra pillows and blankets",
    "Microwave",
    "Coffee maker",
    "Refrigerator",
    "Dishwasher",
    "Dishes and silverware",
    "Cooking basics",
    "Oven",
    "Stove",
    "Single level home",
    "BBQ grill",
    "Patio or balcony",
    "Garden or backyard",
    "Beach essentials",
    "Long term stays allowed",
    "Wide hallway clearance",
    "Step-free access",
    "Wide doorway",
    "Flat path to front door",
    "Well-lit path to entrance",
    "Disabled parking spot",
    "Step-free access",
    "Step-free access",
    "Step-free access",
    "Waterfront",
    "Beachfront"
];

const transformedProperties = properties.map(prop => {
    const regex = /[^A-Za-z0-9]+/g;
    const cababCase = prop.toLowerCase().replace(regex, '-');
    return cababCase;
});

console.log(transformedProperties);

function _StayPreview({ stay, onRemoveStay, view, avgRate }) {
    const { numberWithCommas, getRandomFloatInclusive } = utilService
    const rate = useRef(getRandomFloatInclusive(4, 5, 2)) // Later by Users Rates 1-5 ⭐.
    const isDiscount = useRef(Math.random() < 0.5) // Later by Host 

    // UserDistance handle case of undefined lat lng
    const { lat: userLat, lng: userLng } = locService.getUserLoc()
    const { loc } = stay
    const { countryCode } = loc
    let { lat: stayLat, lng: stayLng, } = loc
    if (!stayLat || !stayLng) {
        let pos = locService.getCoordsFromCountyCode(countryCode)
        stayLat = pos.lat
        stayLng = pos.lng
    }
    const UserDistance = locService.getDistanceFromLatLng(userLat, userLng, stayLat, stayLng)

    // Click on empty space on the Image
    const navigate = useNavigate()
    const onClickImage = (ev) => {
        ev.stopPropagation()
        window.scrollTo(0, 0)
        navigate(`/stay/${stay._id}`)
    }

    // Favorite button & Wishlist
    const { likedByUsers } = stay
    const loggedInUser = userService.getLoggedInUser()
    const [isLike, setIsLike] = useState(
        loggedInUser ? likedByUsers.includes(loggedInUser._id) : false
    )

    const onToggleFavorite = (ev) => {
        ev.stopPropagation() // if inside of the Link 
        console.log('favorite: add to &isFavorite', stay)
    }

    // Gallery Props
    const galleryPreviewProps = {
        onClick: onClickImage,
        items: stay.imgUrls.slice(0, 5).map(url => ({ original: url, })),
        additionalClass: 'preview-gallery',
        showPlayButton: true,
        autoPlay: true,
        slideInterval: 15000, // Default 3000
        showIndex: false,
        showFullscreenButton: false,
        showBullets: true,
        showThumbnails: false,
        useBrowserFullscreen: false,
        loading: 'lazy',
        lazyLoad: true,
        startIndex: 0
    }

    const { propertyType, type, price, _id, summary } = stay
    const { city } = loc
    return <article className='stay-preview'>

        <div className="gallery-container">
            {loggedInUser && <button onClick={onToggleFavorite} className='image-gallery-custom-action'>
                {/* {isLike.current ? <AppIcon iconKey='Favorite' /> : <AppIcon iconKey='FavoriteFill' />} */}
            </button>}

            <ImgGallery viewProps={galleryPreviewProps} />
        </div>

        <Link to={`/stay/${_id}`} className="link-container">
            <div className="rate">{<AppIcon iconKey="Star" />}{rate.current}</div>

            <div className="text heading">
                {propertyType} in {city}
            </div>

            <div className="text summary">{summary}</div>

            <div className="text distance">
                {numberWithCommas(UserDistance)} kilometers
            </div>

            <div className="text price">
                {isDiscount.current && <span className="full-night-price">
                    ${numberWithCommas((price * 1.3).toFixed())}&nbsp;
                </span>}

                <span className="night-price">
                    ${numberWithCommas(price)}&nbsp;
                </span>
                <span className="night">night</span>
            </div>
        </Link>
    </article>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const StayPreview = connect(mapStateToProps)(_StayPreview)