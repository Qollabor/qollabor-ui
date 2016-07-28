import React from 'react';
import { TextField } from 'material-ui';
import { ActionSearch } from 'material-ui/svg-icons';

const style = {
  fontSize: '12px',
  margin: 5,
  textIndent: '20px'
};

const searchIconStyle = {
  position: 'absolute',
  top: '15px',
  left: '2px'
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
    const hintText = this.props.hintText || 'Filter';
    return (
      <div style={{ position: 'relative', width: '300px' }} >
        <ActionSearch style={searchIconStyle}/>
        <TextField
          type="search" hintText={hintText}
          style={style} value={this.state.filterText}
          onKeyUp={this.handleFilterKeyUp.bind(this)} onKeyDown={this.handleFilterKeyDown.bind(this)}
          onChange={this.handleFilterChange.bind(this)}
        />
      </div>
    );
  }
}

TextFilter.propTypes = {
  onFilterChange: React.PropTypes.func.isRequired,
  hintText: React.PropTypes.string
};

export default TextFilter;
