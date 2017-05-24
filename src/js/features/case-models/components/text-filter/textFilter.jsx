import React from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, FontIcon } from 'material-ui';

const style = {
  fontSize: '12px',
  margin: 5
};

class TextFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: props.activeFilter
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFilterKeyUp = this.handleFilterKeyUp.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
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
  }

  handleFilterKeyUp(e) {
    if (e.target.value === '') {
      this.handleClearFilter(e);
    } else if (e.target.value.length >= 2) {
      this.props.onFilterChange(e, e.target.value);
    }
  }

  render() {
    const { activeFilter } = this.props;

    return (
      <div style={{ width: '300px' }}>
        <TextField
          type="text" hintText="Filter"
          style={style} value={this.state.filterText}
          onKeyUp={this.handleFilterKeyUp}
          onChange={this.handleFilterChange}
        />
        {activeFilter ?
          <IconButton
            secondary={true}
            style={{ width: 10, height: 10, top: 5, padding: 0 }}
            onClick={this.handleClearFilter}
          >
            <FontIcon className="material-icons" color="gray" style={{ fontSize: 21 }}>clear</FontIcon>
          </IconButton>
        : null}
      </div>
    );
  }
}

TextFilter.propTypes = {
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired
};

export default TextFilter;
