import React from 'react';
import { TextField } from 'material-ui';

const cursorStyle = {
  cursor: 'pointer'
};
const labelStyle = {
  color: 'rgb(99, 89, 89)',
  fontWeight: 'bold'
};
class ItemTextField extends React.Component {
  render() {
    return (<span>
      <TextField
        disabled={false}
        value={this.props.value}
        floatingLabelText={this.props.name}
        floatingLabelFixed={true}
        underlineShow={false}
        floatingLabelStyle={labelStyle}
        inputStyle={Object.assign(cursorStyle, this.props.inputStyle)}
        style={Object.assign({}, this.props.style)}
      />
    </span>);
  }
}

ItemTextField.propTypes = {
  inputStyle: React.PropTypes.object,
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

export default ItemTextField;
