import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import { stayService } from '../services/stay.service'
import { useViewEffect } from '../hooks/useViewEffect'
import { ImgGallery } from '../cmps/img-gallery'
import { StayOrder } from '../cmps/stay/stay-order'
import IconApp from '../cmps/app-icon'
import { compact, map, mean, meanBy, values } from 'lodash'

export const _StayDetails = () => {
    /* USE */
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [stay, setStay] = useState(null)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    const [searchParams] = useSearchParams()
    const params = useParams()

    const user = useSelector(state => state.userModule.user)

    /* EFFECT */
    useViewEffect('stay-details')

    useEffect(() => { }, [innerWidth])
    // useEffect(() => { loadReviews() }, [id])

    useEffect(() => {
        loadStay()

        window.addEventListener('resize', onSetInnerWidth)

        return () => window.removeEventListener('resize', onSetInnerWidth)
    }, [])

    /* FUNC */
    const loadStay = async () => {
        const stayId = params.id
        try {
            let newStay = await stayService.getById(stayId)
            setStay(newStay)
            document.title = ` ${newStay.name}`
        } catch (err) {
            console.log(`error:${err}`)
        }
    }

    const loadReviews = async () => {
        console.log('loadReviews')
        // const stay = await stayService.getById(params.id)
        // loadStay(stay)
        // dispatch(loadReviews({ hostId: stay.host._id }))
    }

    const onBack = () => { navigate('/') }

    const onSetInnerWidth = () => setInnerWidth(window.innerWidth)

    const onShowReviews = () => console.log('Swal2 || MUI show reviews:', reviews)

    /* STAY */
    if (!stay) return <Box sx={{ display: 'flex', margin: '100px auto' }}>
        <CircularProgress />
    </Box>
    const { imgUrls, name, reviews, host, loc } = stay

    const reviewsSortByDate = reviews.sort((revA, revB) =>
        new Date(revA.date).getTime() > new Date(revB.date).getTime() ? -1 : 1
    )
    console.log(`🚀 ~ reviewsSortByDate:`, reviewsSortByDate || null)

    const rating = meanBy(reviews, ({ rating }) => mean(values(rating))).toFixed(2)
    console.log('rating', rating || null)

    /* PROPS */
    const galleryThumbnailsProps = innerWidth >= 570 ? {
        showThumbnails: true,
        thumbnailPosition: 'left',
        items: imgUrls.map(url => ({ original: url, thumbnail: url })),
    } : {
        showThumbnails: false,
        thumbnailPosition: 'bottom',
        items: imgUrls.map(url => ({ original: url })),
    }

    const galleryProps = {
        showPlayButton: false,
        items: stay.imgUrls.slice(0, 5).map((url, idx) => ({
            // onClick:{()=>{console.log('click')},
            original: url,
            originalClass: "img-gallery-img",
            originalTitle: `${stay.name} Image ${idx + 1}`,
            originalAlt: `${stay.name} Image ${idx + 1}`,
            originalIndex: idx,
            originalObjectFit: "cover",
        })),
        startIndex: parseInt(searchParams.get('clicked-img') || 0),
        additionalClass: 'full img-gallery-details',
        loading: 'eager',
        lazyLoad: false,
        useBrowserFullscreen: false,
        showBullets: false,
        showIndex: true,
        ...galleryThumbnailsProps,
        autoPlay: false,
    }

    /* RETURN */
    const { isSuperHost } = host
    const { city, country } = loc

    return <article className='stay-details'>
        <header className="main-details-heading">
            {/* heading */}
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

            {/* Gallery || images template based screen size*/}
            <ImgGallery id="photos" viewProps={galleryProps} />
            
            <div hidden className="aspect-portrait imgs-template">
                {imgUrls.map((imgUrl, idx) => <img src={imgUrl} key={`imgs-template-${idx}`} alt={`${stay.name} #${idx}`} />)}
            </div>

            {/* anchors nav on the page */}
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