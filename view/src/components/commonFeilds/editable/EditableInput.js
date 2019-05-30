import React, { Component } from 'react'

class EditableInput extends Component {
    state = {
        isActive: false,
        value: "",
        originVavlue: ""
    };

    componentDidMount() {
        const { entity, entityField } = this.props;
        const value = entity[entityField];

        this.setState({
            value,
            originVavlue: value
        })
    };

    enableEdit = () => {
        this.setState({
            isActive: true
        })
    };

    disableEdit = () => {
        this.setState({
            isActive: false
        })
    };




    renderComponentView = () => {
        const { value, isActive } = this.state;
        const { className } = this.props;
        if (isActive) {
            return (
                <>
                    <input
                        className={className}
                        onChange={(e) => this.handleChange(e)}
                        value={value} />
                    <button
                        onClick={this.disableEdit}
                        className='btn btn-warning ml-3'
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
                    {value}
                </span>
                <button
                    onClick={this.enableEdit}
                    className='btn btn-warning ml-3'
                    type='button'>
                    Edit
                </button>
            </>
        )
    };




    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div>
                {this.renderComponentView()}
            </div>
        )
    }
};

export default EditableInput; 