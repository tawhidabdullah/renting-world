import { Component } from "react";
import "../../../styles/rental/_editableComponent.scss";


class EditableComponent extends Component {
  state = {
    isActive: false, 
    value: "",
    originVavlue: "",
  };



  componentDidMount() {
    this.setOriginValue();
  }

  componentDidUpdate() {
    const { errors, entityField, resetErrors } = this.props;

    if (errors && errors.length > 0 && errors[0].title === entityField) {
      this.setOriginValue();
      resetErrors();
    }
  }

  setOriginValue = () => {
    const { entity, entityField } = this.props;
    const value = entity[entityField];

    this.setState({
      value,
      originVavlue: value
    });
  };

  update = async rentalId => {
    const { value, originVavlue } = this.state;
    const { updateEntity, entityField } = this.props;

    if (value !== originVavlue) {
      updateEntity({
        [entityField]: value
      });

      this.setState({ isActive: false, originVavlue: value });
    }
  };

  enableEdit = () => {
    this.setState({
      isActive: true
    });
  };

  disableEdit = () => {
    this.setState({
      isActive: false
    });
  };

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
}

export default EditableComponent;
