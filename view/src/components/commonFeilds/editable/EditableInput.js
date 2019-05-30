import React from 'react'; 
import EditableComponent from "./EditableComponent";
import "../../../styles/rental/_editableComponent.scss";

class EditableInput extends EditableComponent {

    formatView = (value) => {
        const {formatPipe} = this.props; 

        if(formatPipe){
            let formatedValue = value; 
            formatPipe.forEach(pipe => {
                return formatedValue = pipe(formatedValue); 
            });

            return formatedValue ; 
        }; 

        return value; 
    }

    renderComponentView = () => {
        const { value, isActive } = this.state;
        const { className } = this.props;
        if (isActive) {
            return (
                <>
                    <input
                        className={`${className} form-control`}
                        onChange={(e) => this.handleChange(e)}
                        value={value} />

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
                    {this.formatView(value)}
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

export default EditableInput; 