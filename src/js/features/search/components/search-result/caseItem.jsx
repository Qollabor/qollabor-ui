import React from 'react';
import { StatusCapsule } from '../../../../components/capsules';
import { ListItem } from 'material-ui';
import { ActionAssignment } from 'material-ui/svg-icons';
import { blue500 } from 'material-ui/styles/colors';
import ItemBody from './itemBody';
import ItemHeader from './itemHeader';
import ItemTextField from './itemTextField';
import registry from 'app-registry';

class CaseItem extends React.Component {
  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }
  openCaseDetailPage () {
    // TODO
  }

  render () {
    const caseInstance = this.props.item;
    const casePlanItem = caseInstance.planitems.find((elmt) => elmt.type === 'CasePlan');
    return (
      <ListItem
        key={this.props.item.id}
        primaryText={<ItemHeader title={caseInstance.definition} />}
        leftIcon={<ActionAssignment color={blue500} />}
        onTouchTap={this.openCaseDetailPage.bind(this)}
        secondaryText={
          <ItemBody>
            <ItemTextField
              value={casePlanItem.user}
              name="Started By"
            />
            <ItemTextField
              value={this.getLocalFormattedDate(casePlanItem.lastModified)}
              name="Last Modified At"
            />
            <StatusCapsule
              status={casePlanItem.currentState}
            >{casePlanItem.currentState}
            </StatusCapsule>
          </ItemBody>}
      />);
  }
}
export default CaseItem;
