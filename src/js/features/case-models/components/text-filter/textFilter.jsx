import React from 'react';
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

  handleFilterKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.onFilterChange(e, e.target.value);
    }
  }

  handleFilterKeyUp(e) {
    if (e.target.value === '') {
      this.handleClearFilter(e);
    }
  }

  render() {
    const { activeFilter } = this.props;

    return (
      <div style={{ width: '300px' }}>
        <TextField
          type="text" hintText="Filter"
          style={style} value={this.state.filterText}
          onKeyUp={this.handleFilterKeyUp.bind(this)} onKeyDown={this.handleFilterKeyDown.bind(this)}
          onChange={this.handleFilterChange.bind(this)}
        />
        {activeFilter ?
          <IconButton
            secondary={true}
            style={{ width: 10, height: 10, top: 5, padding: 0 }}
            onClick={this.handleClearFilter.bind(this)}
          >
            <FontIcon className="material-icons" color="gray" style={{ fontSize: 21 }}>clear</FontIcon>
          </IconButton>
        : null}
      </div>
    );
  }
}

TextFilter.propTypes = {
  onFilterChange: React.PropTypes.func.isRequired
};

export default TextFilter;
