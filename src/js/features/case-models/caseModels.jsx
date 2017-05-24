import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, FontIcon, Paper } from 'material-ui';
import CaseModelList from './components/list';

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
          <div className="loader-box" />}
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
  initCaseModels: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  items: PropTypes.array
};


CaseModels.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CaseModels;
