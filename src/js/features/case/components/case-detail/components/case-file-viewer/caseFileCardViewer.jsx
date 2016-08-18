import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui';
import { CaseFileViewer } from '../../../case-file';

const headerStyle = {
  backgroundColor: 'rgb(232, 232, 232)'
};

class CaseFileCardViewer extends React.Component {
  render () {
    const { file } = this.props;
    return (
      <Card style={{ margin: '10px' }}>
        <CardHeader
          title="Case Information"
          actAsExpander={true}
          showExpandableButton={true}
          initiallyExpanded={false}
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
  file: React.PropTypes.object.isRequired
};

export default CaseFileCardViewer;