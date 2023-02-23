import { useEffect } from 'react'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImgGallery } from '../../cmps/img-gallery'
import { stayService } from '../../services/stay.service'
import { setView } from '../../store/actions/app.actions'

export const _StayDetails = (props) => {
    const [stay, setStay] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    // VIEW
    const dispatch = useDispatch()
    useEffect(() => {
        loadStay()
        //  -   mount
        dispatch(setView('details'))
        //  -   -   ux ui
        document.body.classList.add('stay-details')
        setTimeout(() => { document.title = `$i ${stay.name || 'Details'}` }, 1500)

        //  -   unmount
        return () => {
            document.body.classList.remove('stay-details')
            document.title = 'Bye from Details!'
        }
    }, [])

    useEffect(() => {
        loadStay()
        setTimeout(() => { document.title = `$i ${stay.name || 'Details'}` }, 1500)

    }, [params.id])

    // IntersectionObserver for the anchors nav 
    useEffect(() => {
        const header = document.querySelector('.main-header');
        const nav = document.querySelector('.main-header-nav');

        const headerObserver = new IntersectionObserver(
            onHeaderObserved,
            { rootMargin: "-91px 0px 0px" }
        )

        headerObserver.observe(header)

        function onHeaderObserved(entries) {
            entries.forEach((entry) => {
                // console.log(`🚀 ~ entry`, entry, nav)

                // nav.style.position = entry.isIntersecting ? 'static' : 'fixed';
            })
        }
    }, [])

    const loadStay = () => {
        const stayId = params.id
        stayService.getById(stayId)
            .then(stay => {
                setStay(stay)
            })
    }

    const onBack = () => {
        navigate('/')
    }

    if (!stay) return <div>Loading...</div>
    const galleryProps = {
        name: stay.name,
        description: stay.summary,
        originalAlt: stay.name + ' Image',
        items: stay.imgUrls.map(url => ({ original: url, thumbnail: url })),
        additionalClass: 'img-gallery-details',
        loading: 'eager',
        lazyLoad: true,
        showThumbnails: true,
        showPlayButton: false,
        thumbnailPosition: 'left', // from $desktop-break screen
        useBrowserFullscreen: true,
        showFullscreenButton: true,
        showBullets: true,
        showIndex: true,
        autoPlay: false,
        // todo: startIndex: this.props.imgClickIdx
    }
    return <section className='stay-details'>
        <ImgGallery viewProps={galleryProps} />
        <h1>{stay.name}</h1>
        <button onClick={onBack}>Back</button>
        {/* <Link to='/stay/r1' >Next Stay</Link> */}
    </section>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const StayDetails = connect(mapStateToProps,)(_StayDetails)