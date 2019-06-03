import React from "react";
import EditableComponent from "./EditableComponent";
import "../../../styles/rental/_editableComponent.scss";

class EditableSelect extends EditableComponent {
  renderOptions = options => {
    return options.map((option, index) => {
      return (
        <option key={index} value={option}>
          {" "}
          {`${option}`}{" "}
        </option>
      );
    });
  };

  renderComponentView = () => {
    const { value, isActive } = this.state;
    const { className, options } = this.props;
    if (isActive) {
      return (
        <>
          <select
            className={`${className} form-control`}
            onChange={e => this.handleChange(e)}
            value={value}
          >
            {this.renderOptions(options)}
          </select>

          <i
            onClick={this.update}
            className="fa fa-check-square"
            style={{
              color: "green",
              fontSize: "23px",
              marginLeft: "8px",
              marginRight: "5px",
              cursor: "pointer"
            }}
          />

          <i
            onClick={this.disableEdit}
            className="fa fa-times"
            style={{
              color: "red",
              fontSize: "23px",
              marginLeft: "8px",
              marginRight: "5px",
              cursor: "pointer"
            }}
          />
        </>
      );
    }

    return (
      <>
        <span className={className}>{`${value}`}</span>
        <i
          onClick={this.enableEdit}
          className="fa fa-edit"
          style={{
            color: "#aaa",
            fontSize: "20px",
            marginLeft: "8px",
            marginRight: "5px",
            cursor: "pointer"
          }}
        />
      </>
    );
  };

  render() {
    return (
      <div style={this.props.containerStyle} className="editableComponent">
        {this.renderComponentView()}
      </div>
    );
  }
}

export default EditableSelect;
