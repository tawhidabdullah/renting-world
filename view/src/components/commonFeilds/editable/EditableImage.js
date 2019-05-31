import React from "react";
import EditableComponent from "./EditableComponent";
import "../../../styles/rental/_editableComponent.scss";
import Upload from "../../FileUpload/test";
import { fetchRentalImg } from "../../../actions/rentalAction";

class EditableImage extends EditableComponent {
    handleImageUpload = (image) => {
        this.setState({
            value: image
        }); 

        this.update();
        this.setImgValue(); 

    }

     setImgValue = async () => {
            await fetchRentalImg(this.props.entity._id).then(img => {
              return this.setState({ isActive: false, value: img });
             });
           }
  
  render() {
    
    const { isActive, value } = this.state;
    return (
      <div className="editableImage">
        {!isActive && (
          <>
            {value && <img src={`/${value}`} />}
            <button
            style={{marginTop: "5px"}}
              onClick={this.enableEdit}
              className="btn btn-warning btn-editable-image"
              type="button"
            >
              Edit
            </button>
          </>
        )}
        {isActive && (
          <>
            <button
              onClick={this.disableEdit}
              className="btn btn-warning btn-editable btn-editable-image"
              type="button"
            >
              Close
            </button>
             <Upload  onUpdateChange={(image)=>this.handleImageUpload(image)}/>
          </>
        
        )}
      </div>
    );
  }
}

export default EditableImage;
