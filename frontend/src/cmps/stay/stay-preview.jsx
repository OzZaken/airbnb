import { Link, Navigate } from 'react-router-dom'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ImgGallery } from '../img-gallery'

function _StayPreview({ stay, onRemoveStay, view }) {
    const onClickImage = (stayId) => {
        console.log('stayId:', stayId)
        console.log('this.props.view:', this.props.view)
        // window.scrollTo(0, 0)
        // Navigate(`/stay/${stayId}`)
    }

    const onFavorite = () => {
        console.log('favorite:')
    }
    const _Favorite = () => { //? why need arrow functions?
        return <button onClick={onFavorite.bind(this)} className='btn-favorite'></button>
    }

    const galleryPreviewProps = {
        items:stay.imgUrls.map((url) => ({ original: url, thumbnail: url })),
        name: stay.name,
        description: stay.summary,
        originalAlt: stay.name + ' Image',
        // renderItem: _Favorite,
        additionalClass: 'img-preview-home',
        showPlayButton: true,
        autoPlay: true,
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

    return <section className='stay-preview'>
        <ImgGallery viewProps={galleryPreviewProps} />
        <h4>{stay.name}</h4>

        <Link to={`/stay/${stay._id}`} className='info'>
            <h5>{stay.type}</h5>
        </Link>
        <div className='actions'>
            <button onClick={() => onRemoveStay(stay._id)}>Delete</button>
            <Link to={`/stay/edit/${stay._id}`} >Edit</Link>
        </div>
    </section>
}

function mapStateToProps(state) {
    const { view } = state.appModule
    return { view }
}

export const StayPreview = connect(mapStateToProps,)(_StayPreview)