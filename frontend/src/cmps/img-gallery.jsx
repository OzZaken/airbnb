import React from "react"
import ImageGallery from 'react-image-gallery';

export class ImgGallery extends React.Component {

    render() {
        return <ImageGallery {...this.props.viewProps}
            infinite={true}
            originalClass='img-gallery-container'
            bulletClass='gallery-bullets'
            thumbnailClass='gallery-thumbnail'
            originalHeight={3000}
            originalWidth={150}
            stopPropagation={true}
            // isRTL={false} // i18n
            originalTitle=''
            //* EVENT HANDLER
            onErrorImageURL={'Logo/url'}
            onImageError={(err) => { console.log('onImageError Error:', err, this.props.imgs) }}
            onThumbnailError={(err) => { console.log('onThumbnailError Error:', err, this.props.imgs) }}
            slideDuration={600} // Default 450
            slideInterval={5000} // Default 3000
            onClick={this.props.onClickImage}
        // onPlay
        // onMouseOver: Function,count each time look per image
        // onMouseLeave: Function, send data 
        //* Default props
        // useTranslate3D={true}// Default true
        // indexSeparator={'/'}// Default '/'
        // showNav={true} // Default true
        // swipingTransitionDuration={0} // Default 0
        // slideOnThumbnailOver={false}
        // *    -   THUMBNAIL
        // thumbnailHeight - image height (html5 attribute)
        // thumbnailWidth-  image width (html5 attribute)
        // thumbnailLoading - image loading. Either "lazy" or "eager" (html5 attribute)
        //  *   -   DISABLE
        // disableThumbnailScroll={false}
        // disableKeyDown={false}
        // disableSwipe={false}
        // disableThumbnailSwipe={false}
        />
    }
}