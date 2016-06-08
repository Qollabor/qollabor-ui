import React from 'react';
import TextFilter from '../text-filter';
import { List as DefinitionList, ListItem } from 'material-ui';
import helpers from '../../../../helpers';

class List extends React.Component {

  handleFilterStringChange (e, filterValue) {
    e.preventDefault();
    this.props.filterData(filterValue);
  }

  render () {
    const { isFetching, filterString } = this.props;
    const items = helpers.casemodel.filterData(this.props.items, filterString);

    return (
      <div>
        <div>
          <TextFilter
            {...this.props} activeFilter={filterString}
            onFilterChange={this.handleFilterStringChange.bind(this)}
          />
          {! isFetching && items.length === 0 &&
            <div style={{ position: 'relative', top: 100, margin: 'auto', width: 200 }}>No Case Models found ...</div>}
          {isFetching && items.length === 0 &&
            <div style={{ position: 'relative', top: 100, margin: 'auto', width: 200 }}>Loading ...</div>}
          <DefinitionList>
            {items
              .map(item =>
                <ListItem
                  key={item.name}
                  primaryText={item.name}
                  secondaryText="Description"
                  onTouchTap={this.props.onTouchTap && this.props.onTouchTap.bind(this, item.definitions)}
                />
              )}
          </DefinitionList>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  // actions
  filterData: React.PropTypes.func,

  // state items
  items: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  filterString: React.PropTypes.string
};

export default List;
