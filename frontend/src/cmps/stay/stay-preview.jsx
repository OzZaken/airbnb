import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { ImgGallery } from '../system/img-gallery'
import IconApp from '../app-icon'

export const StayPreview = ({ stay, onToggleIsInWishlist, onClickImg, loggedInUser, onSetAvgRate }) => {
    /* PREVIEW Intersection Observer */
    const [isIntersecting, setIsIntersecting] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)

            /* if already visible unobserve*/
            if (entry.isIntersecting) observer.unobserve(entry.target)

        }, { threshold: 0, rootMargin: '0px 0px 100px 0px' })

        if (ref.current) observer.observe(ref.current)

        return () => observer.disconnect()
    }, [])

    const pageIdxRef = useRef(0)// todo: last stay Intersection Observer :
    // const pageIdxRef = useRef(0)
    // function onNextPage() {
    //     pageIdxRef.current++
    //     const isLastPage = (PAGE_SIZE + pageIdxRef.current * PAGE_SIZE >= stays.length)
    //     return isLastPage
    // }

    // function onPrevPage() {
    //     pageIdxRef.current--
    //     const isFirstPage = (PAGE_SIZE + pageIdxRef.current * PAGE_SIZE >= stays.length)
    //     return isFirstPage
    // }
    const lastPreviewIntersection = () => {
        /* Toggle .show if stay is Intersecting */
        const elLastStayObserver = new IntersectionObserver(entries => {
            const lastCard = entries[0]
            if (!lastCard.isIntersecting) return
            // onLoadMoreStays() || onNextPage

            elLastStayObserver.unobserve(lastCard.target)
            elLastStayObserver.observe(document.querySelector('.stay-preview:last-child'))
        }, {})

        elLastStayObserver.observe(document.querySelector('.stay-preview:last-child'))
    }

    const { imgUrls, _id, likedByUsers } = stay

    /* GALLERY ~ props*/
    const galleryImgsProps = imgUrls.slice(0, 5).map((url, idx) => ({
        original: url,
        originalClass: "img-gallery-img",
        // originalTitle: `${stay.name} #${idx + 1}`, // Optional
        originalAlt: `${stay.name} #${idx + 1}`,
        originalIndex: idx,
        onClick: () => { onClickImg(idx, _id) },
        originalObjectFit: "cover",
    })).flat() /* remove the extra layer of array */

    const previewGalleryProps = {
        items: galleryImgsProps,
        infinite: false,
        startIndex: 0,
        additionalClass: 'preview-gallery',
        showPlayButton: false,
        autoPlay: false,
        showIndex: false,
        showFullscreenButton: false,
        showBullets: true,
        showThumbnails: false,
        useBrowserFullscreen: false,
        loading: 'lazy',
        lazyLoad: true,
    }

    /* GALLERY ~ 📝 Wishlist: check if contains stay._id */
    const isOnWishList = useRef(loggedInUser ? likedByUsers.includes(loggedInUser._id) : false)

    /* LINK ~ 👣 User distance:Calc between stay and user */
    const { loc } = stay
    const [userDistance, setUserDistance] = useState(null)
    // setUserDistance(locService.getUserDistance(loc))

    /* LINK ~ Dummy data: Discount,Rate,watches*/
    const { numberWithCommas, getRandomFloatInclusive, getRandomIntInclusive } = utilService
    const isDiscount = useRef(Math.random() < 0.5)
    const RandRate = useRef(getRandomFloatInclusive(4, 5, 2))
    const watchesCount = useRef(getRandomIntInclusive(10000, 70000))

    const { propertyType, price, summary } = stay
    const { city } = loc

    return <article ref={ref} className={`stay-preview ${isIntersecting ? 'show' : ''}`} >
        <div className="gallery-container">
           
            {/* WishList */}
            {loggedInUser && (
                <button className='image-gallery-custom-action' onClick={() => { onToggleIsInWishlist(stay)}} >
                    {isOnWishList ? <IconApp iconKey='Favorite' /> : <IconApp iconKey='FavoriteFill' />}
                </button>
            )}

            {/* Gallery Content */}
            <ImgGallery viewProps={previewGalleryProps} />
        </div>

        <Link to={`/stay/${_id}`} className="link-container">
            {/*  heading */}
            <span className="txt heading">
                {propertyType} in {city}
            </span>

            {/* summary */}
            <span className="txt summary">
                {summary}
            </span>

            {/*👣 userDistance || stay watches 👀 */}
            {userDistance ? <span className="txt distance">
                {numberWithCommas(userDistance)} kilometers
            </span> : <span className="txt views-count">
                {numberWithCommas(watchesCount.current)} watches this month
            </span>}

            {/* $ price */}
            <div className="txt price">
                {isDiscount.current && <span className="full-night-price">
                    ${numberWithCommas((price * 1.3).toFixed())}&nbsp;
                </span>}

                <span className="night-price">
                    ${numberWithCommas(price)}&nbsp;
                </span>
                <span className="night">night</span>
            </div>

            {/*⭐ rate */}
            <span className="rate">
                {<IconApp className="fs-small" iconKey="Star" />}
                {RandRate.current}
            </span>
        </Link>
    </article>
}