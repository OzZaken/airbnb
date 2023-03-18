import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
/* services */
import { stayService } from '../services/stay.service'
/* hooks */
import { useViewEffect } from '../hooks/useViewEffect'
/* cmps */
import { ImgGallery } from '../cmps/system/img-gallery'
import { StayOrder } from '../cmps/stay/stay-order'
import IconApp from '../cmps/app-icon'
/* UI UX */
import { Box, CircularProgress } from '@mui/material'
/* actions */

export const _StayDetails = () => {
    // const dispatch = useDispatch()
    const [searchParams] = useSearchParams()

    // ↓ Main Func
    const [stay, setStay] = useState(null)
    const loadStay = async () => {
        const stayId = id
        try {
            let newStay = await stayService.getById(stayId)
            setStay(newStay)
            document.title = ` ${newStay.name}`
        } catch (err) {
            console.log(`error:${err}`)
        }
    }

    /* ↓  responsive cmps */
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const onSetInnerWidth = () => setInnerWidth(window.innerWidth)
    useEffect(() => { }, [innerWidth])

    /* ↓ Changed based url params Id */
    const { id } = useParams()
    useEffect(() => { loadStay() }, [id])

    /* ↓ user*/
    const user = useSelector(state => state.userModule.user)
    console.log(`🚀 ~ user:`, user)

    /* ↓ Home Navigation */
    const navigate = useNavigate()
    const onBack = () => { navigate('/') }

    /* ↓ cdm ,cwum */
    useViewEffect('stay-details')
    useEffect(() => {
        loadStay()
        window.addEventListener('resize', onSetInnerWidth)

        return () => {
            window.removeEventListener('resize', onSetInnerWidth)
        }
    }, [])

    // Todo */
    const onShowReviews = () => {
        console.log('Swal2 || MUI show reviews:', reviews)
    }

    /* Loader */
    if (!stay) return (
        <Box sx={{ display: 'flex', margin: '100px auto' }}>
            <CircularProgress />
        </Box>
    )
    const { imgUrls, name, reviews, host, loc } = stay

    /* Gallery */
    const galleryImgsProp = stay.imgUrls.slice(0, 5).map((url, idx) => ({
        // onClick:{()=>{console.log('click')},
        original: url,
        originalClass: "img-gallery-img",
        originalTitle: `${stay.name} Image ${idx + 1}`,
        originalAlt: `${stay.name} Image ${idx + 1}`,
        originalIndex: idx,
        originalObjectFit: "cover",
    }))
    const galleryClickedImgProp = parseInt(searchParams.get('clicked-img') || 0)
    const galleryThumbnailsProps = innerWidth >= 570
        ? {
            showThumbnails: true,
            thumbnailPosition: 'left',
            items: imgUrls.map(url => ({ original: url, thumbnail: url })),
        }
        : {
            showThumbnails: false,
            thumbnailPosition: 'bottom',
            items: imgUrls.map(url => ({ original: url })),
        }
    const mainGalleryProps = {
        showPlayButton: false,
        items: galleryImgsProp,
        startIndex: galleryClickedImgProp,
        additionalClass: 'full img-gallery-details',
        loading: 'eager',
        lazyLoad: false,
        useBrowserFullscreen: false,
        showBullets: false,
        showIndex: true,
        ...galleryThumbnailsProps,
        autoPlay: false,
    }

    const { isSuperHost } = host

    const { city, country } = loc
    return <article className='stay-details'>
        <header className="main-details-heading">

            <div className="flex-inline details-heading">
                <h1>{name}</h1>

                <div className='details-sub-heading'>
                    {/* avg rate & reviews */}
                    {reviews?.length
                        ? <>
                            <span>
                                <IconApp className="fs-small" iconKey="Star" />
                                4.98 &nbsp;
                            </span>

                            <span role="button" onClick={onShowReviews} className='reviews'>
                                {`${reviews.length + ' reviews'}`}  &#xB7;
                            </span>
                        </>
                        : <span>New &#xB7;</span>}

                    {/* isSuperHost */}
                    {isSuperHost && <span className='super-host'>
                        <IconApp iconKey='SuperHost' />SuperHost&#xB7;
                    </span>}

                    {/* loc */}
                    <span> {`${city},${country}`}</span>

                    <div hidden className='btns-container'>

                        <button className='btn-link'>
                            <IconApp iconKey="Share" />share
                        </button>

                        <button className='btn-link'>
                            <IconApp iconKey="FavoriteFill" />saved
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <ImgGallery id="photos" viewProps={mainGalleryProps} />
            <div hidden className="aspect-portrait imgs-template">
                {imgUrls.map((imgUrl, idx) => <img src={imgUrl} key={idx} alt={`${stay.name} ${idx}`} />)}
            </div>

            <nav className="transparent details-anchors-nav">
                <ul className='details-anchors-list'>
                    <li><Link to='#photos'>photos</Link></li>
                    <li><Link to='#amenities'>amenities</Link></li>
                    <li><Link to='#reviews'>reviews</Link></li>
                    <li><Link to='#location'>location</Link></li>
                </ul>
            </nav>
        </header>

        <main className='main-details'>
            {/* Main-Details */}
            <section className='details-container'>

                <div className="main-info-container">
                    {/* <AirCover /> */}
                    <div className="stay-details-row air-cover-container">
                        <div className="img-container">
                            <IconApp iconKey="airCover" />
                        </div>
                        <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        <button className="btn-big"><b>Read more</b></button>
                    </div>
                    {/*  <summary/> */}
                    <div className="stay-details-row summery">
                        <p>{stay.summary}</p>
                    </div>
                    {/*  <amenities/> */}
                </div>

                <aside className='main-order-container'>
                    <StayOrder stay={stay} reviewsCount={reviews?.length} />
                </aside>
            </section>
            {/* Reviews */}
            <div className='stay-reviews'>Reviews</div>
            {/* Map */}
            <div className='stay-map'>Map</div>
        </main>

        <button onClick={onBack}>Back</button>
        {/* <Link to='/stay/r1' >Next Stay</Link> */}
    </article>
}

function mapStateToProps(state) {
    const { view } = state.systemModule
    return { view }
}

export const StayDetails = connect(mapStateToProps,)(_StayDetails)