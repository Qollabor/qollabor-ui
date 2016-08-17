import React from 'react';
import JSONPretty from 'react-json-pretty';

class CaseFileViewer extends React.Component {
  render () {
    const { file } = this.props;
    return (
      <div>
        {<JSONPretty id="json-pretty" json={file} />}
      </div>
    );
  }
}
CaseFileViewer.propTypes = {
  file: React.PropTypes.object.isRequired
};

export default CaseFileViewer;
