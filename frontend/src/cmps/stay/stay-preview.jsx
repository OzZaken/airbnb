import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { ImgGallery } from '../img-gallery'
import { utilService } from '../../services/util.service'

function _StayPreview({ stay, onRemoveStay, view, avgRate }) {
    const { numberWithCommas, getRandomIntInclusive, getRandomFloatInclusive } = utilService
    const rating = useRef(getRandomFloatInclusive(4, 5, 1))
    const reviews = useRef(getRandomIntInclusive(1, 20))
    const boolean = useRef(Math.random() < 0.5)
    const distance = (Math.sqrt(Math.pow(stay.loc.lat - 31.77, 2) + Math.pow(stay.loc.lat - 35.21, 2)) * 100).toFixed(0)
    const navigate = useNavigate()

    const onFavorite = () => {
        console.log('favorite:')
    }
    const _Favorite = () => {
        return <button onClick={onFavorite.bind(this)} className='btn-favorite'></button>
    }
    const onClickImage = (stayId) => {
        console.log('stayId:', stayId)
        console.log('this.props.view:', this.props.view)
        // window.scrollTo(0, 0)
        // Navigate(`/stay/${stayId}`)
    }
    const onNav = (stayId)=> {
        console.log(`🚀 ~ onNav:`, stayId)
        window.scrollTo(0, 0)
        navigate(`/stay/${stayId}`)
    }
    const galleryPreviewProps = {
        items: stay.imgUrls.map(url => ({ original: url, thumbnail: url })),
        additionalClass: '',
        // name: stay.name,
        // description: stay.summary,
        // originalAlt: stay.name + ' Image',
        // renderItem: _Favorite,
        showPlayButton: true,
        autoPlay: false,
        showIndex: false,
        showFullscreenButton: false,
        showBullets: true,
        showThumbnails: false,
        thumbnailPosition: 'bottom',
        useBrowserFullscreen: false,
        loading: 'lazy',
        lazyLoad: true,
        startIndex: 0
    }

    const { name, _id, type, loc, price } = stay
    return <section className='stay-preview'>

        <div className="gallery-container">
            <ImgGallery viewProps={galleryPreviewProps} />
        </div>

        <Link to={`/stay/${_id}`} className="link-container">
            <div className="text loc">{stay.propertyType} in {stay.loc.city}</div>
            <div className="text summary">{stay.summary}</div>
            <div className="text distance">{numberWithCommas(distance)} kilometers</div>
            <div className="text price">
                { boolean.current && <span className="full-night-price">
                        ${numberWithCommas((stay.price * 1.3).toFixed())}&nbsp;
                    </span>
                }
                <span className="night-price">
                    ${numberWithCommas(stay.price)}&nbsp;
                </span>
                <span className="night">night</span>
            </div>
        </Link>
    </section>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const StayPreview = connect(mapStateToProps,)(_StayPreview)