import { useEffect } from 'react'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppIcon from '../cmps/app-icon'
import { ImgGallery } from '../cmps/img-gallery'
import { StayOrder } from '../cmps/stay-order'
import { stayService } from '../services/stay.service'
import { updateView } from '../store/app.actions'
import { useSelector } from 'react-redux'

export const _StayDetails = () => {
    const dispatch = useDispatch()

    // ↓ Changed based url params Id
    const { id } = useParams()
    useEffect(() => { loadStay() }, [id])

    // ↓ Main Func
    const [stay, setStay] = useState(null)
    const loadStay = async () => {
        const stayId = id
        try {
            let newStay = await stayService.getById(stayId)
            setStay(newStay)
            document.title = ` ${newStay.name}`
        } catch (err) {
            console.log('err:', err)
        }
    }

    // ↓ Notify cmps for responsive
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const onSetInnerWidth = () => setInnerWidth(window.innerWidth)
    useEffect(() => { }, [innerWidth])

    const user = useSelector(state => state.userModule.user)

    // ↓ Home Navigation 
    const navigate = useNavigate()
    const onBack = () => { navigate('/') }

    // ↓ mount ,willUnMount
    useEffect(() => {
        loadStay()
        dispatch(updateView('stay-details'))

        window.addEventListener('resize', onSetInnerWidth)
        document.body.classList.add('stay-details')

        // Intersection Observer
        const header = document.querySelector('.main-details-heading')
        const nav = document.querySelector('.details-anchors-nav')

        const _onHeaderObserved = (entries) => {
            entries.forEach(entry => {
                console.log('entry', entry)
                nav.style.position = entry.isIntersecting ? 'static' : 'fixed';
                // nav.style.classList = entry.isIntersecting ? 'static' : 'fixed';
            },)
        }

        if (header && nav) {
            const headerObserver = new IntersectionObserver(
                _onHeaderObserved, {
                rootMargin: "-91px 0px 0px",
            })
            headerObserver.observe(header)
        }
        // cwun
        return () => {
            window.removeEventListener('resize', onSetInnerWidth)
            document.body.classList.remove('stay-details')
        }
    }, [])

    // todo: move to stay-app
    const onShowReviews = () => {
        console.log('Swal2 || MUI show reviews:', reviews)
    }

    if (!stay) return <div>Loading...</div>
    const { imgUrls, name, reviews, host, loc } = stay

    // Gallery
    const thumbnailsProps = innerWidth >= 570 ? {
        showThumbnails: true,
        thumbnailPosition: 'left',
        items: imgUrls.map(url => ({ original: url, thumbnail: url })),
    } : {
        showThumbnails: false,
        showPlayButton: false,
        items: imgUrls.map(url => ({ original: url })),
    }
    const galleryProps = {
        showThumbnails: false,
        showPlayButton: false,
        items: stay.imgUrls.slice(0, 5).map((url, idx) => ({
            original: url,
            originalClass: "img-gallery-img",
            originalTitle: `${stay.name} Image ${idx + 1}`,
            originalAlt: `${stay.name} Image ${idx + 1}`,
            originalIndex: idx,
            originalObjectFit: "cover",
        })),
        startIndex: parseInt(new URLSearchParams(window.location.search).get('imgIndex')) || 0,
        additionalClass: 'full img-gallery-details',
        loading: 'eager',
        lazyLoad: false,
        useBrowserFullscreen: true,
        showBullets: false,
        showIndex: true,
        ...thumbnailsProps,
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
                                <AppIcon className="fs-small" iconKey="Star" />
                                4.98 &nbsp;
                            </span>

                            <span role="button" onClick={onShowReviews} className='reviews'>
                                {`${reviews.length + ' reviews'}`}  &#xB7;
                            </span>
                        </>
                        : <span>New &#xB7;</span>}

                    {/* isSuperHost */}
                    {isSuperHost && <span className='super-host'>
                        <AppIcon iconKey='SuperHost' />SuperHost&#xB7;
                    </span>}

                    {/* loc */}
                    <span> {`${city},${country}`}</span>

                    <div hidden className='btns-container'>
                        
                        <button className='btn-link'>
                            <AppIcon iconKey="Share" />share
                        </button>
                        
                        <button className='btn-link'>
                            <AppIcon iconKey="FavoriteFill" />saved
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <ImgGallery id="photos" viewProps={galleryProps} />
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
                            <AppIcon iconKey="airCover" />
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
    const { view } = state.appModule
    return { view }
}

export const StayDetails = connect(mapStateToProps,)(_StayDetails)