import React from 'react';
import SearchList from './components/search-result/itemList';
import { ActionInfoOutline } from 'material-ui/svg-icons';
import { blue500 } from 'material-ui/styles/colors';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

const noItemsStyle = {
  textAlign: 'center'
};

const searchResultStyle = {
  backgroundColor: 'white'
};

const scrollProps = {
  mouseWheel: true,
  scrollbars: false
};

class SearchResult extends React.Component {
  componentWillMount() {
    if (this.props.initSearchResult) {
      this.props.initSearchResult();
    }
  }
  onScrollEnd() {
    if (this.props.getNextSetOfItems) {
      this.props.getNextSetOfItems();
    }
  }

  render() {
    const { items, isFetching } = this.props;
    return (<div style={searchResultStyle}>
      {isFetching && items.length === 0 && <div className="loader-box" />}
      {!isFetching && items.length === 0 &&
        <div style={noItemsStyle}><ActionInfoOutline color={blue500} /> No items to display</div>}
      <ReactIScroll
        iScroll={iScroll}
        options={scrollProps}
        onScrollEnd={this.onScrollEnd.bind(this)}
      >
        <SearchList items={items} />
      </ReactIScroll>
    </div>
    );
  }
}

SearchResult.propTypes = {
  getNextSetOfItems: React.PropTypes.func,
  initSearchResult: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool,
  items: React.PropTypes.array
};

export default SearchResult;
