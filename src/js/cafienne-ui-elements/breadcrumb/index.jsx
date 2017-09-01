import React from 'react';
import Radium from 'radium';

import styles from './styles';
import PropTypes from 'prop-types';

export const Breadcrumb = Radium(
  class extends React.Component {
    render() {
      let subItem;
      if (this.props.item.description) {
        subItem = (
          <span>
            <span className="breadcrumb-separator" style={styles.separator}>
              {this.props.separator}
            </span>
            <span style={styles.itemNoUrl} className="breadcrumb-no-url-item">
              {this.props.item.description}
            </span>
          </span>
        );
      }

      return (
        <div>
          <a className="breadcrumb-url-item" style={styles.itemUrl} href={this.props.item.url}>
            {this.props.item.label}
          </a>
          {subItem}
        </div>
      );
    }
  }
);

Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.defaultProps = {
  separator: '>'
};

Breadcrumb.propTypes = {
  separator: React.PropTypes.string,
  item: React.PropTypes.shape({
    label: React.PropTypes.string,
    url: React.PropTypes.string,
    description: React.PropTypes.string
  })
};

export default Breadcrumb;
