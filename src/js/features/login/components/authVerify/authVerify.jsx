import React from 'react';
import PropTypes from 'prop-types';
import { RefreshIndicator } from 'material-ui';
import styles from './styles';

export class AuthVerify extends React.Component {
  render() {
    return this.props.isVerifyAuth ? (
      <div style={styles.alignContainer}>
        <div style={styles.alignSubContainer}>
          <RefreshIndicator
            size={60}
            left={5}
            top={5}
            status="loading"
          />
        </div>
      </div>
    ) : <div>{this.props.children}</div>;
  }
}

AuthVerify.displayName = 'AuthVerify';

AuthVerify.propTypes = {
  children: PropTypes.node,
  isVerifyAuth: PropTypes.bool
};

export default AuthVerify;
