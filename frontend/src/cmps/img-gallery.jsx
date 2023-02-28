import React from "react"
import ImageGallery from 'react-image-gallery';

export class ImgGallery extends React.Component {

    render() {
        return <ImageGallery {...this.props.viewProps}
            infinite={true}
            originalClass='img-gallery-container'
            bulletClass='gallery-bullets'
            thumbnailClass='gallery-thumbnail'
            stopPropagation={true}
            onClick={this.props.onClickImage}
            // isRTL={false} // i18n
            onErrorImageURL={'logo Url'}
            onImageError={(err) => { console.log('onImageError Error:', err, this.props.imgs) }}
            onThumbnailError={(err) => { console.log('onThumbnailError Error:', err, this.props.imgs) }}
            slideDuration={600} // Default 450
        // originalHeight={}
        // originalWidth={}
        // originalTitle=''
        // onPlay
        // onMouseOver: Function,count each time look per image
        // onMouseLeave: Function, send data 
        //* Default props
        // useTranslate3D={true}// Default true
        // indexSeparator={'/'}// Default '/'
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