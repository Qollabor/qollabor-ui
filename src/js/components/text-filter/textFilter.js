import React from 'react';
import { TextField } from 'material-ui';
import { ActionSearch } from 'material-ui/svg-icons';
import { white } from 'material-ui/styles/colors';

const style = {
  fontSize: '12px',
  marginLeft: 5,
  marginTop: 5,
  textIndent: '20px'
};

const searchIconStyle = {
  position: 'absolute',
  top: '13px',
  left: '2px'
};

const underlineStyle = {
  bottom: '12px'
};

const searchTextStyle = {
  color: 'white'
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
        <ActionSearch style={searchIconStyle} color={white}/>
        <TextField
          type="search" hintText={hintText}
          style={style} value={this.state.filterText}
          underlineStyle={underlineStyle}
          hintStyle={Object.assign(searchTextStyle, this.props.hintStyle)}
          inputStyle={Object.assign(searchTextStyle, this.props.inputStyle)}
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
