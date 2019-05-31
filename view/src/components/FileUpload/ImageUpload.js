import React, { Component } from "react";
import "../../styles/editable/_imageUpload.scss";
import { uploadImage } from "../../actions/fileUploadAction";

class ImageUpload extends Component {
  constructor() {
    super();
    this.setupReader();
    this.state = {
      selectedFile: "",
      imageBase64: "",
      pending: false,
      status: "INIT"
    };
  }
  onChange = e => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      this.setState({
        selectedFile
      });

      this.reader.readAsDataURL(selectedFile);
    }
  };

  componentDidUpdate(prevprops,nextprops){
    if(prevprops !== nextprops){
      
    }
  }

  setupReader = () => {
    this.reader = new FileReader();

    this.reader.addEventListener("load", e => {
      this.setState({
        imageBase64: e.target.result
      });
    });
  };

  onSuccess = uploadedImage => {};

  onError = () => {};

  uploadImage = async () => {
    const { onChange } = this.props;
    const { selectedFile, pending } = this.state;

    if (selectedFile) {

     await this.setState({
        pending: true,
        status: "INIT"
      });

      window.setTimeout(() => {
        this.setState({
          pending: false,
          status: "INIT"
        });
        onChange(selectedFile);
      }, 4000);


    }

    // uploadImage(selectedFile)
    // .then((uploadedImage)=>{
    //   this.onSuccess(uploadedImage);
    // }, (error)=>{
    //   this.onError(error);
    // })
  };

  renderSpinningCircle = () => {
    const {pending} = this.state; 
    if(pending){
      return (
        <div class="loader">Loading...</div>
      );
    }
     
 
  };

  render() {
    const { selectedFile, imageBase64 } = this.state;
    return (

      <div className="img-upload-container">
          
        <label className="img-upload btn btn-secondary">
          <span className="upload-text">Select an image</span>
          <input
            type="file"
            accept=".jpg .png .jpeg"
            onChange={this.onChange}
          />
        </label>
        {selectedFile && (
          <button
            onClick={this.uploadImage}
            disabled={!selectedFile}
            className="btn btn-success btn-upload"
            type="button"
          >
            Upload Image
          </button>
        )}
        {imageBase64 && (
          <div className="img-preview-container">
            <div
              className="img-preview"
              style={{ backgroundImage: `url('${imageBase64}')` }}
            />
         { this.renderSpinningCircle()}
          </div>
        )}
      
      </div>
    );
  }
}

export default ImageUpload;
