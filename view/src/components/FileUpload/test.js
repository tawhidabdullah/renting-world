import React, { Component } from "react";
import "../../styles/editable/_imageUpload.scss";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import { toast } from "react-toastify";

class Upload extends Component {
  constructor() {
    super();
    this.setupReader();
    this.state = {
      selectedFile: "",
      imageBase64: "",
      pending: false,
      status: "INIT",
      showSuccessalert: false,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80
      },
      croppedImage: {},
      initialImageBase64: ""
    };
  }

  onCropChange = crop => {
    this.setState({ crop });
  };

  onChange = e => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      this.setState({
        selectedFile,
        initialImageBase64: ""
      });

      this.reader.readAsDataURL(selectedFile);
    }
  };

  setupReader = () => {
    this.reader = new FileReader();

    this.reader.addEventListener("load", e => {
      const { initialImageBase64 } = this.state;
      let imageBase64 = e.target.result;

      if (initialImageBase64) {
        this.setState({
          imageBase64
        });
      } else {
        this.setState({
          imageBase64,
          initialImageBase64: imageBase64
        });
      }
    });
  };

  uploadImage = async () => {
    const { onChange } = this.props;
    const { croppedImage } = this.state;

    if (croppedImage) {
      await this.setState({
        pending: true
      });

      window.setTimeout(() => {
       this.resetToDefaultState(); 
        onChange(croppedImage);
        this.setState({
            showSuccessalert: true
        })

        window.setTimeout(()=>{
            this.setState({
                showSuccessalert: false
            })
        }, 4000); 
       
      }, 4000);
    }

  };

  showSuccessalert = () => {
     return(
        <div className='alert alert-success success-alert'>
            Image has Uploaded Successfully!
        </div>
     )
  }

  renderSpinningCircle = () => {
    const { pending } = this.state;
    if (pending) {
      return <div class="loader">Loading...</div>;
    }
  };

  resetToDefaultState = () => {
    this.setState({
      pending: false,
      status: "INIT",
      selectedFile: undefined,
      croppedImage: {},
      imageBase64: "",
      initialImageBase64: "",
      crop: { }
    });
  };

  onImageLoaded = image => {
    if (image.naturalWidth < 950 && image.naturalHeight < 720) {
        console.log('get a life')
      this.resetToDefaultState();
      return toast.error("Minium width of an image is 950px and height 720px");
    }; 

    this.setState({
      crop: makeAspectCrop(
        {
          x: 10,
          y: 10,
          aspect: 4 / 3,
          width: 50
        },
        image.width / image.height
      )
    });
  };

  onCropCompleted = async (crop, pixelCrop) => {
    const { selectedFile, initialImageBase64 } = this.state;
    if (selectedFile && (pixelCrop.height > 0 && pixelCrop.width > 0)) {
      const img = new Image();
      img.src = initialImageBase64;
      const croppedImage = await getCroppedImg(
        img,
        pixelCrop,
        selectedFile.name
      );
      this.setState({
        croppedImage
      });

      this.reader.readAsDataURL(croppedImage);
    }
  };

  render() {
    const { selectedFile, imageBase64, crop, initialImageBase64, showSuccessalert } = this.state;
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

        {initialImageBase64 && (
          <ReactCrop
            src={initialImageBase64}
            onComplete={this.onCropCompleted}
            onImageLoaded={image => this.onImageLoaded(image)}
            crop={crop}
            onChange={crop => this.onCropChange(crop)}
          />
        )}

        {imageBase64 && (
          <div className="img-preview-container">
            <div
              className="img-preview"
              style={{ backgroundImage: `url('${imageBase64}')` }}
            />
            {this.renderSpinningCircle()}
          </div>
        )}
        {showSuccessalert && this.showSuccessalert()}
      </div>
    );
  }
}

function getCroppedImg(image, pixelCrop, fileName) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      blob.name = fileName;
      resolve(blob);
    }, "image/jpeg");
  });
}

export default Upload;
