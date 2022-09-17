import { Component } from 'react'
import { uploadService } from '../services/upload.service'

export class ImgUploader extends Component {
  
  state = {
    imgUrl: null,
    height: '500px',
    width: "500px",
    isUploading: false
  }

  uploadImg = async (ev) => {
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url, height, width })
    this.props.onUploaded && this.props.onUploaded(secure_url)
  }

  render() {
    const { imgUrl} = this.state

    return (
      <div className="upload-preview"  >
        {imgUrl && <img src={imgUrl} className="upload-img" style={{maxWidth: '200px'}} />}
        {!imgUrl && <input type="file" onChange={ this.uploadImg } accept="img/*" id="imgUpload" />}
      </div>
    )
  }
}
