import React from 'react';
import { RefreshIndicator } from 'material-ui';

import styles from './styles';

export const propTypes = {
  title: React.PropTypes.string,
  isFetching: React.PropTypes.bool,
  error: React.PropTypes.object
};

export const TitledBox = (WrappedComponent) => {
  const returnClass = class extends React.Component {
    render() {
      let legend = false;
      if (this.props.title) {
        legend = <legend style={styles.legend}>{this.props.title}</legend>;
      }

      let content;
      if (this.props.isFetching) {
        content = (
          <div style={styles.refreshContainer}>
            <RefreshIndicator
              size={30}
              left={5}
              top={5}
              status="loading"
            />
          </div>
        );
      } else if (this.props.error && this.props.error.isError) {
        content = (
          <div style={styles.error}>{this.props.error.message}</div>
        );
      } else {
        content = (
          <section style={styles.section}>
            <WrappedComponent {...this.props} />
          </section>
          );
      }

      return (
        <div>
          {legend}
          {content}
        </div>
      );
    }
  };
  returnClass.propTypes = Object.assign({}, propTypes, WrappedComponent.propTypes);

  return returnClass;
};

export default TitledBox;
