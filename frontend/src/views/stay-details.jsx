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

const _StayDetails = () => {
    const user = useSelector(state => state.userModule.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = useParams()

    const [stay, setStay] = useState(null)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    useViewEffect('stay-details')

    useEffect(() => {
        loadStay()

        window.addEventListener('resize', onSetInnerWidth)

        return () => window.removeEventListener('resize', onSetInnerWidth)
    }, [])

    useEffect(() => { }, [innerWidth])

    // useEffect(() => { loadReviews() }, [id])

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

    const onBack = () => navigate('/')

    const onSetInnerWidth = () => setInnerWidth(window.innerWidth)

    const onShowReviews = () => console.log('show reviews:', reviews)

    if (!stay) return <Loader />
    const { imgUrls, name, reviews, host, loc } = stay
    const { isSuperHost } = host
    const { city, country } = loc

    const rateToShow = meanBy(reviews, ({ rating }) => mean(values(rating))).toFixed(2)
    const reviewsToShow = reviews.sort((revA, revB) =>
        new Date(revA.date).getTime() > new Date(revB.date).getTime() ? -1 : 1
    )

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
        id: "photos",
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
        autoPlay: false,
        ...galleryThumbnailsProps,
    }
    const detailsHeading = {
        name,
        reviews,
        isSuperHost,
        city,
        country,
        onShowReviews,
    }
    const mainDetails = {
        className: 'main-details',
        stay,
        reviews
    }
    const imgsTemplate = {
        imgUrls: stay.imgUrls,
        name: stay.name
    }

    return <article className='stay-details'>
        <header className="main-details-heading">
            <HeadingDetails {...detailsHeading} />

            <ImgGallery {...galleryProps} />
            <ImgsTemplateDetails hidden {...imgsTemplate} />
        </header>

        <AnchorsNavDetails />

        <MainDetails {...mainDetails} />

        <button onClick={onBack}>Back</button>
        {/* <Link to='/stay/r1' >Next Stay</Link> */}
    </article>
}

const ImgsTemplateDetails = ({ imgUrls, name }) => {
    return <section className="aspect-portrait imgs-template">
        {imgUrls.map((url, idx) =>
            <img src={url} key={`imgs-template-${idx}`} alt={`${name} #${idx}`} />
        )}
    </section>
}

const MainDetails = ({ stay, reviews }) => {
    return <main >
        <section className='details-container'>

            <div className="main-info-container">
                <AirCover />

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

        <div className='stay-reviews'>Reviews</div>

        <div className='stay-map'>Map</div>
    </main>
}

const AirCover = () => {
    return <div className="stay-details-row air-cover-container">
        <div className="img-container">
            <IconApp iconKey="airCover" />
        </div>
        <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
        <button className="btn-big"><b>Read more</b></button>
    </div>
}

const Loader = () => {
    return <Box sx={{ display: 'flex', margin: '100px auto' }}>
        <CircularProgress />
    </Box>
}

const AnchorsNavDetails = () => {
    return <nav className="transparent details-anchors-nav">
        <ul className='details-anchors-list'>
            <li><Link to='#photos'>photos</Link></li>
            <li><Link to='#amenities'>amenities</Link></li>
            <li><Link to='#reviews'>reviews</Link></li>
            <li><Link to='#location'>location</Link></li>
        </ul>
    </nav>
}

const HeadingDetails = ({ name, reviews, onShowReviews, isSuperHost, city, country }) => {
    return <section className="flex-inline details-heading">
        <h1>{name}</h1>

        <div className='details-sub-heading'>
            {/* avg rate or reviews (based user approved get is location)*/}
            {reviews?.length ? <>
                <span>
                    <IconApp className="fs-small" iconKey="Star" />
                    4.98 &nbsp;
                </span>

                <span role="button" onClick={onShowReviews} className='reviews'>
                    {`${reviews.length + ' reviews'}`}  &#xB7;
                </span>
            </> : <span>New &#xB7;</span>}

            {isSuperHost && <span className='super-host'>
                <IconApp iconKey='SuperHost' />SuperHost&#xB7;
            </span>}

            <span>{`${city},${country}`}</span>

            <div hidden className='btns-container'>

                <button className='btn-link'>
                    <IconApp iconKey="Share" />share
                </button>

                <button className='btn-link'>
                    <IconApp iconKey="FavoriteFill" />saved
                </button>
            </div>
        </div>
    </section>
}

function mapStateToProps(state) {
    const { view } = state.systemModule
    return { view }
}

export const StayDetails = connect(mapStateToProps,)(_StayDetails)