import React from 'react';
import Immutable from 'immutable';
import ProgressItem from './components/progressItem';
import { ProgressLine } from './components/progressLine';
import moment from 'moment';

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
    && item.historyState !== 'Null')).sort((item1, item2) => {
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
    const matchArray = lastModified.match(new RegExp('\\.[0-9]*Z'));
    return parseInt(matchArray[0].substring(1, matchArray[0].length - 1), 10);
  }

  render() {
    const items = Immutable.List(this.props.items);
    const mileStonesAndStages = this.getMileStonesAndStages(items);
    let progressItems = Immutable.List(mileStonesAndStages.map(item => {
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
