import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from 'material-ui';
import { ActionSearch } from 'material-ui/svg-icons';

const style = {
  fontSize: '12px',
  marginLeft: 5,
  marginTop: 5,
  textIndent: '20px'
};

const iconStyle = {
  position: 'absolute',
  top: '13px',
  left: '2px'
};

const underlineStyle = {
  bottom: '12px'
};

class TextFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: props.activeFilter
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFilterKeyUp = this.handleFilterKeyUp.bind(this);
    this.handleFilterKeyDown = this.handleFilterKeyDown.bind(this);
  }

  handleClearFilter(e) {
    this.setState({
      filterText: ''
    });

    this.props.onFilterChange(e, '');
  }

  handleFilterChange(e) {
    this.setState({
      filterText: e.target.value
    });

    if (e.target.value === '') {
      this.props.onFilterChange(e, '');
    }
  }

  handleFilterKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.onFilterChange(e, e.target.value);
    }
  }

  handleFilterKeyUp(e) {
    if (e.target.value === '') {
      this.props.onFilterChange(e, '');
    }
  }

  render() {
    const hintText = this.props.hintText || 'Filter';
    return (
      <div style={{ position: 'relative', width: '300px' }} >
        <ActionSearch style={Object.assign({}, iconStyle, this.props.searchIconStyle)} />
        <TextField
          type="search" hintText={hintText}
          style={style} value={this.state.filterText}
          underlineStyle={underlineStyle}
          hintStyle={this.props.hintStyle}
          inputStyle={this.props.inputStyle}
          onKeyUp={this.handleFilterKeyUp} onKeyDown={this.handleFilterKeyDown}
          onChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

TextFilter.propTypes = {
  activeFilter: PropTypes.string,
  hintStyle: PropTypes.object,
  hintText: PropTypes.string,
  inputStyle: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  searchIconStyle: PropTypes.object
};

export default TextFilter;
