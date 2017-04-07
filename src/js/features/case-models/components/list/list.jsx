import React from 'react';
import TextFilter from '../../../../components/text-filter';
import { List as DefinitionList, ListItem } from 'material-ui';
import registry from 'app-registry';
import MessageDiv from '../message-div';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterStringChange = this.handleFilterStringChange.bind(this);
  }

  handleFilterStringChange (event, filterValue) {
    try {
      event.preventDefault();
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      event.returnValue = false;
    }
    this.props.filterData(filterValue);
  }

  render () {
    const helpers = registry.get('helpers');
    const { filterString } = this.props;
    let { items } = this.props;
    // TODO: bad reassignment, props are read only
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
                  secondaryText={item.description}
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
            onFilterChange={this.handleFilterStringChange}
          />
          {listBody}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  error: React.PropTypes.object,
  filterData: React.PropTypes.func,
  items: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  filterString: React.PropTypes.string,
  onTouchTap: React.PropTypes.func
};

export default List;
