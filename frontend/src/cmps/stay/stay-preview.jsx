import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { ImgGallery } from '../img-gallery'
import { utilService } from '../../services/util.service'
import AppIcon from '../app-icon'
import { locService } from '../../services/loc.service'
import { userService } from '../../services/user.service'

function _StayPreview({ stay, onRemoveStay, view, avgRate }) {
    const { numberWithCommas, getRandomFloatInclusive } = utilService
    const RandRate = useRef(getRandomFloatInclusive(4, 5, 2)) // Later by Users Rates 1-5 ⭐.
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

    // ClickOnImg set the img idx to 0 
    const navigate = useNavigate()
    const onClickImage = (ev) => {
        console.log('ev:', ev)
        ev.stopPropagation()
        window.scrollTo(0, 0)
        navigate(`/stay/${stay._id}`)
    }

    // Wishlist
    const { likedByUsers } = stay
    const loggedInUser = userService.getLoggedInUser()
    const [isOnWishList, setIsOnWishList] = useState(
        loggedInUser ? likedByUsers.includes(loggedInUser._id) : false
    )

    const onToggleFavorite = (ev) => {
        ev.stopPropagation() // if inside of the Link 
        console.log('favorite: add to &isFavorite', stay)
    }

    // Gallery Props
    const galleryPreviewProps = {
        onClickImage,
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

    const { propertyType, price, _id, summary } = stay
    const { city } = loc
    return <article className='stay-preview'>

        <div className="gallery-container">
            {loggedInUser && <button onClick={onToggleFavorite} className='image-gallery-custom-action'>
                {/* {isLike.current ? <AppIcon iconKey='Favorite' /> : <AppIcon iconKey='FavoriteFill' />} */}
            </button>}

            <ImgGallery viewProps={galleryPreviewProps} />
        </div>

        <Link to={`/stay/${_id}`} className="link-container">
            <div className="flex-center rate">{<AppIcon iconKey="Star" />}{RandRate.current}</div>

            <div className="text heading">{propertyType} in {city}</div>

            <div className="text summary">{summary}</div>

            <div className="text distance">{numberWithCommas(UserDistance)} kilometers</div>

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