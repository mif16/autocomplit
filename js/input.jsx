export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {placeholderStyle: {}, inputBorderColor: {}};
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleFocus() {
        this.setState({
            placeholderStyle: {color: '#cacaca'},
            inputBorderColor: {borderColor: "HighLight"}
        });
        ReactDOM.findDOMNode(this.refs.input).select();
    }

    handleBlur() {
        this.setState({placeholderStyle: {}, inputBorderColor: {}});
    }

    render() {
        let inputProps = {
            acceptCharset: "UTF-8",
            type: 'text',
            name: 'city',
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            ref: 'input'
        };
        let input = <input{...inputProps}{...this.props} style={this.state.inputBorderColor}/>;
        let placeholder = null;
        let placeholderProps = {
            className: 'placeholder',
            onFocus: this.handleFocus,
            onClick: this.handleFocus
        };
        if (this.props.value == '') {
            placeholder =
                <span {...placeholderProps} style={this.state.placeholderStyle}>Начните вводить название</span>;
        }
        return (
            <div className="delivery_list">
                <span>Город: </span>
                {input}
                {placeholder}
            </div>
        );
    }
}