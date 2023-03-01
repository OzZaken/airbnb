import { useEffect } from 'react'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppIcon from '../../cmps/app-icon'
import { ImgGallery } from '../../cmps/img-gallery'
import { StayOrder } from '../../cmps/stay/stay-order'
import { stayService } from '../../services/stay.service'
import { updateView } from '../../store/app.actions'

export const _StayDetails = () => {
    const dispatch = useDispatch()

    // ↓ Main Func
    const [stay, setStay] = useState(null)
    const loadStay = async () => {
        const stayId = params.id
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

    // ↓ Changed based url params Id
    const params = useParams()
    useEffect(() => { loadStay() }, [params.id])

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
    const { isSuperHost } = host
    const thumbnailsProps = innerWidth >= 570 ? {
        items: imgUrls.map(url => ({ original: url, thumbnail: url })),
        showThumbnails: true,
        thumbnailPosition: 'left',
    } : {
        showPlayButton: false,
        items: imgUrls.map(url => ({ original: url })),
        thumbnailPosition: 'top',
    }
    const galleryProps = {
        ...thumbnailsProps,
        additionalClass: 'full img-gallery-details',
        loading: 'eager',
        lazyLoad: false,
        useBrowserFullscreen: true,
        showFullscreenButton: true,
        showBullets: false,
        showIndex: true,
        autoPlay: false,
    }


    const { city, country } = loc
    return <article className='stay-details'>
        <header className="main-details-heading">

            <div className="details-heading">
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
                        <span>
                            <AppIcon iconKey="Share" />
                            <button className='txt capitalize underline'>share</button>
                        </span>
                        <span>
                            <AppIcon iconKey="FavoriteFill" />
                            <button className='txt capitalize underline'>saved</button>
                        </span>
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