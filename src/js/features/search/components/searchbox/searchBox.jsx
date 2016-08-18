import React from 'react';
import TextFilter from '../../../../components/text-filter';

class SearchBox extends React.Component {

  componentWillMount() {
    if (this.props.initSearch) {
      this.props.initSearch();
    }
  }

  handleFilterChange(e, searchText) {
    // TODO i didnt like the hash approach, need to think about a better one
    if (this.props.setFilter) {
      const locationHash = `/search/?searchText=${searchText}`;
      if (window.location.hash.indexOf('/search') < 0) {
        this.context.router.push(locationHash);
      } else {
        window.location.hash = locationHash;
        this.props.setFilter(searchText);
      }
    }
  }

  render() {
    const { searchText } = this.props;
    return (
      <TextFilter
        {...this.props}
        hintText="Search"
        hintStyle={{ color: 'white' }}
        inputStyle={{ color: 'white' }}
        onFilterChange={this.handleFilterChange.bind(this)}
        activeFilter={searchText}
      />); }
  }

SearchBox.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SearchBox;
