import { useEffect } from 'react'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImgGallery } from '../../cmps/img-gallery'
import { StayOrder } from '../../cmps/stay/stay-order'
import { stayService } from '../../services/stay.service'
import { iconService } from '../../services/svg.service'
import { updateView } from '../../store/app.actions'

export const _StayDetails = (props) => {
    const [stay, setStay] = useState(null)
    const params = useParams()
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const onSetInnerWidth = () => setInnerWidth(window.innerWidth)
    const dispatch = useDispatch()

    useEffect(() => {
        loadStay()
        dispatch(updateView('stay-details'))

        window.addEventListener('resize', onSetInnerWidth)
        document.body.classList.add('stay-details')
        return () => {
            window.removeEventListener('resize', onSetInnerWidth)
            document.body.classList.remove('stay-details')
        }
    }, [])
    useEffect(() => { }, [innerWidth])
    useEffect(() => { loadStay() }, [params.id])

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

    const onShowReview = () => {
        console.log('Swal2 || MUI reviews:', reviews)
    }

    const navigate = useNavigate()
    const onBack = () => {
        navigate('/')
    }

    // IntersectionObserver for the anchors nav 
    // useEffect(() => {
    //     const header = document.querySelector('.main-header');
    //     const nav = document.querySelector('.main-header-nav');

    //     const headerObserver = new IntersectionObserver(
    //         onHeaderObserved,
    //         { rootMargin: "-91px 0px 0px" }
    //     )

    //     headerObserver.observe(header)

    //     function onHeaderObserved(entries) {
    //         entries.forEach((entry) => {
    // nav.style.position = entry.isIntersecting ? 'static' : 'fixed';
    //         })
    //     }
    // }, [])

    if (!stay) return <div>Loading...</div>
    const { Star } = iconService
    const { imgUrls, name, reviews } = stay
    const galleryProps = {
        items: imgUrls.map(url => ({ original: url, thumbnail: url })),
        additionalClass: 'full img-gallery-details',
        loading: 'eager',
        lazyLoad: true,
        showThumbnails: false,
        thumbnailPosition: 'bottom',
        showPlayButton: false,
        useBrowserFullscreen: true,
        showFullscreenButton: true,
        showBullets: false,
        showIndex: true,
        autoPlay: false,
    }

    return <article className='stay-details'>
        <header className="details-heading">
            <h1>{name}</h1>

            <div className="flex details-sub-heading">
                <span>
                    {Star()}

                    <button onClick={onShowReview} className='underline'>
                        {`${reviews.length + ' reviews' || 'new'}`}&#xB7;
                    </button>
                </span>
                {/* Gallery */}
            </div>

            {innerWidth <= 500
                ? <ImgGallery viewProps={galleryProps} />
                : <div className="aspect-portrait imgs-template">
                    {imgUrls.slice(0, 5).map((imgUrl, idx) => <img src={imgUrl} key={idx} alt={`${stay.name} ${idx}`} />)}
                </div>
            }
            <nav className="details-anchors-nav">
                <ul hidden className='clean-list'>
                    <li><Link></Link></li>
                </ul>
            </nav>
        </header>

        <main className='main-details main-layout'>
            {/* Main-Details */}
            <section className='details-container'>
                
                <div className="left-details-container">
                    {/* <AirCover /> */}
                    <div className="air-cover">air-cover</div>
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