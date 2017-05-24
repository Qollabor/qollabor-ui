import React from 'react';
import PropTypes from 'prop-types';
import { ActionInfoOutline } from 'material-ui/svg-icons';
import { blue500 } from 'material-ui/styles/colors';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import { List } from 'material-ui';
import CaseItem from './components/caseItem';

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

class CaseList extends React.Component {
  constructor(props) {
    super(props);

    this.onScrollEnd = this.onScrollEnd.bind(this);
  }
  componentWillMount () {
    if (this.props.initCaseList) {
      this.props.initCaseList();
    }
  }
  onScrollEnd () {
    if (this.props.getNextSetOfItems) {
      this.props.getNextSetOfItems();
    }
  }

  render () {
    const { items, isFetching, userDetails, caseTeamUsers } = this.props;
    const caseItems = this.props.items.map(item => <CaseItem
      item={item} team={item.team} key={item.id}
      userDetails={userDetails} caseTeamUsers={caseTeamUsers}
    />);
    return (<div style={searchResultStyle}>
      {isFetching && items.length === 0 && <div className="loader-box" />}
      {!isFetching && items.length === 0 &&
        <div style={noItemsStyle}><ActionInfoOutline color={blue500} /> No items to display</div>}
      <ReactIScroll
        iScroll={iScroll}
        options={scrollProps}
        onScrollEnd={this.onScrollEnd}
      >
        <List>{caseItems}</List>
      </ReactIScroll>
    </div>
    );
  }
}

CaseList.propTypes = {
  caseTeamUsers: PropTypes.array,
  getNextSetOfItems: PropTypes.func,
  initCaseList: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  userDetails: PropTypes.object
};

export default CaseList;
