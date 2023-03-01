import React from "react"
import ImageGallery from 'react-image-gallery'

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
        />
    }
}