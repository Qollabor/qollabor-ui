import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui';
import { CaseFileViewer } from '../../../case-file';

const headerStyle = {
  backgroundColor: 'rgb(232, 232, 232)'
};

class CaseFileCardViewer extends React.Component {
  render () {
    const { file } = this.props;
    return (
      <Card style={{ margin: '10px' }} initiallyExpanded={false}>
        <CardHeader
          title="Case Information"
          actAsExpander={true}
          showExpandableButton={true}
          style={headerStyle}
        />
        <CardText expandable={true} style={{ overflow: 'auto' }}>
          <CaseFileViewer file={file} />
        </CardText>
      </Card>
    );
  }
}
CaseFileCardViewer.propTypes = {
  file: PropTypes.object.isRequired
};

export default CaseFileCardViewer;
