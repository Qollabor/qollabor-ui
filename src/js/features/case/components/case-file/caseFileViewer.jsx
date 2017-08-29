import React from 'react';
import PropTypes from 'prop-types';
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
  file: PropTypes.object.isRequired
};

export default CaseFileViewer;
