import React from "react"
import ImageGallery from 'react-image-gallery'
export class ImgGallery extends React.Component {
    render() {
        return <ImageGallery {...this.props}
            showPlayButton={false}
            originalClass='img-gallery-container'
            bulletClass='gallery-bullets'
            thumbnailClass='gallery-thumbnail'
            onClick={this.props.onClickImage}
            // slideInterval={15000}  // Default 3000
            // isRTL={false} // i18n
            onErrorImageURL={'logo Url'}
            onImageError={(err) => { console.log('onImageError Error:', err, this.props.imgs) }}
            onThumbnailError={(err) => { console.log('onThumbnailError Error:', err, this.props.imgs) }}
        />
    }
}