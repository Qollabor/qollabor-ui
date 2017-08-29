import React from 'react';
import { ActionInfoOutline } from 'material-ui/svg-icons';
import { blue500 } from 'material-ui/styles/colors';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import { List } from 'material-ui';
import CaseItem from './components/caseItem';
import theme from '../../themes';

const noItemsStyle = {
  fontFamily: theme.fontFamily,
  textAlign: 'center',
  width: '100%',
  paddingTop: '12px'
};

const alignIconsStyle = {
  display: 'inline-flex',
  verticalAlign: 'middle',
  alignItems: 'center'
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
  componentWillMount() {
    if (this.props.initCaseList) {
      this.props.initCaseList();
    }
  }
  onScrollEnd() {
    if (this.props.getNextSetOfItems) {
      this.props.getNextSetOfItems();
    }
  }

  render() {
    const { items, isFetching, userDetails, caseTeamUsers } = this.props;
    const caseItems =
      this.props.items.map(item =>
        <CaseItem
          item={item}
          team={item.team}
          key={item.id}
          userDetails={userDetails}
          caseTeamUsers={caseTeamUsers}
        />);
    return (
      <div style={searchResultStyle}>
        {isFetching && items.length === 0 && <div className="loader-box" />}
        {!isFetching && items.length === 0 && <div style={noItemsStyle}><div style={alignIconsStyle}><ActionInfoOutline color={blue500} />
          <span style={{ marginLeft: '4px' }}>No items to display</span></div></div>}
        <ReactIScroll iScroll={iScroll} options={scrollProps} onScrollEnd={this.onScrollEnd}>
          <List>{caseItems}</List>
        </ReactIScroll>
      </div>
    );
  }
}

CaseList.propTypes = {
  caseTeamUsers: React.PropTypes.array,
  getNextSetOfItems: React.PropTypes.func,
  initCaseList: React.PropTypes.func.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  isFetching: React.PropTypes.bool,
  userDetails: React.PropTypes.object
};

export default CaseList;
