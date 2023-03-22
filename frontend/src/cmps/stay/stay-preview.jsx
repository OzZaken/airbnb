import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { ImgGallery } from '../img-gallery'
import IconApp from '../app-icon'
import { Box, Skeleton } from '@mui/material'
import { locService } from '../../services/loc.service'
// const { getUserDistance } = locService
const { getNumWithCommas, getRandomFloatInclusive, getRandomIntInclusive } = utilService

export const StayPreview = ({ stay, loggedInUser, isLoading, onToggleIsInWishlist, onSetStayAvgRate, onClickImg }) => {
    // props
    const { reviews, _id, likedByUsers, propertyType, price, summary, imgUrls, loc } = stay
    const { city } = loc
    
    // useState
    const [isIntersecting, setIsIntersecting] = useState(false)
    const [userDistance, setUserDistance] = useState(null)
    // setUserDistance(getUserDistance(loc))

    // useRef
    const isDiscount = useRef(Math.random() < 0.5)
    const RandRate = useRef(getRandomFloatInclusive(4, 5, 2))
    const watchesCount = useRef(getRandomIntInclusive(10000, 70000))

    const isOnWishList = useRef(loggedInUser ? likedByUsers.includes(loggedInUser._id) : false)
    const IntersectionRef = useRef()

    // intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {

            setIsIntersecting(entry.isIntersecting)

            /* if already visible unobserve*/
            if (entry.isIntersecting) observer.unobserve(entry.target)

        }, { threshold: 0, rootMargin: '0px 0px 100px 0px' })

        if (IntersectionRef.current) observer.observe(IntersectionRef.current)

        return () => observer.disconnect()
    }, [])

    // useEffect(() => {
    //     onSetStayAvgRate()
    // }, [reviews])

    // cmps props
    const stayPreview = {
        ref: IntersectionRef,
        className: 'stay-preview' + isIntersecting ? ' show' : ''
    }
    const headingStayPreview = {
        name: stay.name,
        onClickImg,
        imgUrls,
        loggedInUser,
        onToggleIsInWishlist,
        _id, isOnWishList
    }
    const linkStayPreview = {
        propertyType,
        city,
        summary,
        userDistance,
        watchesCount,
        isDiscount,
        price,
        RandRate,
        _id
    }

    return isLoading ? <LoaderStayPreview /> : <article {...stayPreview} >

        <HeadingStayPreview {...headingStayPreview} />

        <LinkStayPreview {...linkStayPreview} />
    </article>
}

const HeadingStayPreview = ({ name, onClickImg, imgUrls, loggedInUser, onToggleIsInWishlist, _id, isOnWishList }) => {
    const btnWishList = {
        className: 'image-gallery-custom-action',
        onClick: () => onToggleIsInWishlist(_id)
    }
    const imgGallery = {
        items: imgUrls.slice(0, 5).map((url, idx) => ({
            original: url,
            originalClass: "img-gallery-img",
            // originalTitle: `${stay.name} #${idx + 1}`, // Optional
            originalAlt: `${name} #${idx + 1}`,
            originalIndex: idx,
            onClick: () => { onClickImg(idx, _id) },
            originalObjectFit: "cover",
        })).flat(),
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

    return <header className="heading-stay-preview">
        {loggedInUser && <button  {...btnWishList}>
            {isOnWishList ? <IconApp iconKey='Favorite' /> : <IconApp iconKey='FavoriteFill' />}
        </button>}

        <ImgGallery {...imgGallery} />
    </header>
}

const LinkStayPreview = ({ _id, propertyType, city, summary, userDistance, watchesCount, isDiscount, price, RandRate }) => {
    return <Link to={`/stay/${_id}`} className="link-stay-preview">

        <span className="txt heading">
            {propertyType} in {city}
        </span>

        <span className="txt summary">{summary}</span>

        {
            userDistance ? <span className="txt distance">
                {getNumWithCommas(userDistance)} kilometers
            </span> : <span className="txt views-count">
                {getNumWithCommas(watchesCount.current)} watches this month
            </span>
        }

        <div className="txt price">
            {isDiscount.current && <span className="full-night-price">
                ${getNumWithCommas((price * 1.3).toFixed())}&nbsp;
            </span>}

            <span className="night-price">
                ${getNumWithCommas(price)}&nbsp;
            </span>
            <span className="night">night</span>
        </div>

        <span className="rate">
            {<IconApp className="fs-small" iconKey="Star" />}
            {RandRate.current}
        </span>
    </Link>
}

const LoaderStayPreview = () => {
    return <Box sx={{ display: 'flex', margin: '30px auto' }}>
        <Skeleton variant="rectangular" width={300} height={300} />
    </Box>
}

// last  Intersection Observer and pageIDX:
// const pageIdxRef = useRef(0)
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

// const lastPreviewIntersection = () => {
//     /* Toggle .show if stay is Intersecting */
//     const elLastStayObserver = new IntersectionObserver(entries => {
//         const lastCard = entries[0]
//         if (!lastCard.isIntersecting) return
//         // onLoadMoreStays() || onNextPage

//         elLastStayObserver.unobserve(lastCard.target)
//         elLastStayObserver.observe(document.querySelector('.stay-preview:last-child'))
//     }, {})

//     elLastStayObserver.observe(document.querySelector('.stay-preview:last-child'))
// }