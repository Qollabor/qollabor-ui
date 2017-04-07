import React from 'react';
import CaseModelList from './components/list';
import { IconButton, FontIcon, Paper } from 'material-ui';

export class CaseModels extends React.Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleCaseModelSelect = this.handleCaseModelSelect.bind(this);
  }

  componentWillMount () {
    if (this.props.initCaseModels) {
      this.props.initCaseModels();
    }
  }

  handleRefreshClick() {
    this.props.initCaseModels();
  }

  handleCaseModelSelect(definition) {
    if (this.context.router) {
      this.context.router.push(`/casemodels/${definition}`);
    }
  }

  render () {
    const { items, isFetching } = this.props;

    const buttonStyles = {
      float: 'right'
    };

    const toolBarStyles = {
      float: 'right',
      color: 'gray',
      overflow: 'hidden'
    };

    return (
      <Paper style={{ margin: 2 }}>
        {isFetching && items.length === 0 &&
          <div className="loader-box"></div>}
        <div style={toolBarStyles}>
          <IconButton
            tooltip="Refresh"
            onClick={this.handleRefreshClick}
            style={buttonStyles}
          >
            <FontIcon className="material-icons" color="gray">refresh</FontIcon>
          </IconButton>
        </div>
        <CaseModelList onTouchTap={this.handleCaseModelSelect} />
      </Paper>
    );
  }
}

CaseModels.propTypes = {
  initCaseModels: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool,
  items: React.PropTypes.array
};


CaseModels.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CaseModels;
