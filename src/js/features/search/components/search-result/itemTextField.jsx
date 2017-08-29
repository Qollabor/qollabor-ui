import React from 'react';
import PropTypes from 'prop-types';
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
  inputStyle: PropTypes.object,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default ItemTextField;
