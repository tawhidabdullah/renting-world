import React from "react";
import EditableComponent from "./EditableComponent";
import "../../../styles/rental/_editableComponent.scss";
import Upload from "../../FileUpload/test";
import { fetchRentalImg } from "../../../actions/rentalAction";

class EditableImage extends EditableComponent {
  handleImageUpload = image => {
    this.setState({
      value: image
    });

    this.update();
    this.setImgValue();
  };

  setImgValue = async () => {
    await fetchRentalImg(this.props.entity._id).then(img => {
      return this.setState({ isActive: false, value: img });
    });
  };

  render() {
    const { isActive, value } = this.state;
    return (
      <div className="editableImage">
        {!isActive && (
          <>
            {value && <img src={`/${value}`} />}
            <i
              onClick={this.enableEdit}
              className="fa fa-edit"
              style={{
                color: "#aaa",
                fontSize: "40px",
                marginLeft: "8px",
                marginRight: "5px",
                cursor: "pointer",
                marginTop: "5px"
              }}
            />
          </>
        )}
        {isActive && (
          <>
            <i
              className="fa fa-times"
              onClick={this.disableEdit}
              style={{
                color: "red",
                fontSize: "29px",
                marginLeft: "8px",
                marginRight: "5px",
                marginTop: "10px",
                cursor: "pointer"
              }}
            />
            <Upload onUpdateChange={image => this.handleImageUpload(image)} />
          </>
        )}
      </div>
    );
  }
}

export default EditableImage;
