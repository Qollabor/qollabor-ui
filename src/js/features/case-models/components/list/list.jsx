import React from 'react';
import TextFilter from '../../../../components/text-filter';
import { List as DefinitionList, ListItem } from 'material-ui';
import registry from 'app-registry';
import MessageDiv from '../message-div';

class List extends React.Component {

  handleFilterStringChange (event, filterValue) {
    try {
      event.preventDefault();
    } catch (e) {
      event.returnValue = false;
    }
    this.props.filterData(filterValue);
  }

  render () {
    const helpers = registry.get('helpers');
    let { filterString, items } = this.props;
    if (filterString) {
      items = helpers.casemodel.filterData(this.props.items, filterString);
    }

    let listBody;

    if (this.props.isFetching) {
      listBody = <MessageDiv message="Loading ..." />;
    } else if (this.props.error && this.props.error.isError) {
      listBody = <MessageDiv message={this.props.error.message} />;
    } else if (!items || items.length === 0) {
      listBody = <MessageDiv message="No Case Models found ..." />;
    } else {
      listBody = (<DefinitionList>
            {items
              .map(item =>
                <ListItem
                  key={item.name}
                  primaryText={item.name}
                  secondaryText="Description"
                  innerDivStyle={{ fontSize: 15 }}
                  onTouchTap={this.props.onTouchTap && this.props.onTouchTap.bind(this, item.definitions)}
                />
              )}
      </DefinitionList>);
    }


    return (
      <div>
        <div>
          <TextFilter
            {...this.props} activeFilter={filterString}
            onFilterChange={this.handleFilterStringChange.bind(this)}
          />
          {listBody}
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
