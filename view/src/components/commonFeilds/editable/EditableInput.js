import React from "react";
import EditableComponent from "./EditableComponent";
import "../../../styles/rental/_editableComponent.scss";

class EditableInput extends EditableComponent {
  formatView = value => {
    const { formatPipe } = this.props;

    if (formatPipe) {
      let formatedValue = value;
      formatPipe.forEach(pipe => {
        return (formatedValue = pipe(formatedValue));
      });

      return formatedValue;
    }

    return value;
  };

  renderComponentView = () => {
    const { value, isActive } = this.state;
    const { className } = this.props;
    if (isActive) {
      return (
        <>
          <input
            className={`${className} form-control`}
            onChange={e => this.handleChange(e)}
            value={value}
          />

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
        <span className={className}>{this.formatView(value)}</span>
        <i
          onClick={this.enableEdit}
          className="fa fa-edit"
          style={{
            color: "#aaa",
            fontSize: "20px",
            marginLeft: "8px",
            marginRight: "5px",
            cursor: "pointer",
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

export default EditableInput;
