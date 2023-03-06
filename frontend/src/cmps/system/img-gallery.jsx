import React from "react"
import ImageGallery from 'react-image-gallery'

export class ImgGallery extends React.Component {
    render() {
        return <ImageGallery
         {...this.props.viewProps}
            showPlayButton={false}
            thumbnailPosition='top'
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


// export const ImgGallery = ({ viewProps, onClickImage }) => {
//     const renderItem = (item) => {
//       return (
//         <div className="img-container image-gallery-image">
//           <img
//             src={item.original}
//             alt={item.originalAlt}
//             srcSet={item.srcSet}
//             title={item.originalTitle}
//             onClick={() => onClickImage(item.index)}
//           />
//         </div>
//       )
//     }
  
//     return (
//       <ImageGallery
//         {...viewProps}
//         infinite={true}
//         originalClass='img-gallery-container'
//         bulletClass='gallery-bullets'
//         thumbnailClass='gallery-thumbnail'
//         onClick={onClickImage}
//         // isRTL={false} // i18n
//         onErrorImageURL={'logo Url'}
//         onImageError={(err) => { console.log('onImageError Error:', err, viewProps.items) }}
//         onThumbnailError={(err) => { console.log('onThumbnailError Error:', err, viewProps.items) }}
//         renderItem={renderItem}
//       />
//     )
//   }
  