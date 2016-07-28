import React from 'react';
import { FileUploader } from '../features/case/components';
import { CaseAttachments } from '../features/case';

class InfoPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Info</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat
          nulla pariatur.
        </p>
        <FileUploader
          caseId="345894325"
        />
        <CaseAttachments />
      </div>
    );
  }
}

export default InfoPage;
