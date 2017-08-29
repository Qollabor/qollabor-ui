import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import moment from 'moment';
import registry from 'app-registry';
import ProgressItem from './components/progressItem';
import { ProgressLine } from './components/progressLine';

const progressContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'space-between'
};

export default class CaseProgressViewer extends React.Component {

  getMileStonesAndStages(planItems) {
    return planItems.filter(item => ((item.type === 'Stage' || item.type === 'Milestone')
    && item.historyState !== 'Null' && item.transition !== 'ParentTerminate')).sort((item1, item2) => {
      const moment1 = moment(item1.lastModified);
      const moment2 = moment(item2.lastModified);
      return moment1.isSame(moment2) ? this.getMilliseconds(item1.lastModified) -
      this.getMilliseconds(item2.lastModified) : moment2.isBefore(moment1);
    });
  }

  getPlanItemsForStage(planItems, stageId) {
    return planItems.filter(item => item.stageId === stageId);
  }

  getMilliseconds(lastModified) {
    return registry.get('helpers').getMilliseconds(lastModified);
  }

  render() {
    const items = Immutable.List(this.props.items);
    const mileStonesAndStages = this.getMileStonesAndStages(items);
    let progressItems = Immutable.List(mileStonesAndStages.map((item) => {
      let progressItem = <ProgressItem status={item.currentState} name={item.name} items={[item]} />;
      if (item.type === 'Stage') {
        const planItemsForStage = this.getPlanItemsForStage(items, item.id);
        progressItem = <ProgressItem status={item.currentState} name={item.name} items={planItemsForStage} />;
      }
      return progressItem;
    }));
    progressItems = progressItems.zip(Immutable.Repeat(<ProgressLine />, progressItems.size)).flatMap(x => x).butLast();
    return (
      <div style={{ width: '100%', maxWidth: '700px', margin: 'auto' }}>
        <div
          className="progress"
          style={progressContainer}
        >
          {progressItems}
        </div>
      </div>
    );
  }
}

CaseProgressViewer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};
