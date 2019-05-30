import React from 'react'; 
import EditableComponent from "./EditableComponent";
import "../../../styles/rental/_editableComponent.scss";


class EditableSelect extends EditableComponent {

    renderOptions = (options) => {
      return  options.map((option,index) => {
            return <option key={index} value={option}> {`${option}`} </option>
        }); 
    }

    renderComponentView = () => {
        const { value, isActive } = this.state;
        const { className , options } = this.props;
        if (isActive) {
            return (
                <>
                    <select
                        className={`${className} form-control`}
                        onChange={(e) => this.handleChange(e)}
                        value={value}
                         >
                             {this.renderOptions(options)}
                    </select>

                    <button
                        onClick={this.update}
                        className='btn btn-success btn-editable'
                        type='button'>
                        Save
                    </button>
                    <button
                        onClick={this.disableEdit}
                        className='btn btn-warning btn-editable'
                        type='button'>
                        Close
                    </button>
                </>
            )
        };



        return (
            <>
                <span
                    className={className}>
                    {`${value}`}
                </span>
                <button
                    onClick={this.enableEdit}
                    className='btn btn-warning btn-editable'
                    type='button'>
                    Edit
                </button>
            </>
        )
    };
    
    render() {
        return (
            <div style={this.props.containerStyle} className='editableComponent'>
                {this.renderComponentView()}
            </div>
        )
    }
};

export default EditableSelect; 