import React from 'react';
import Radium from 'radium';
import styles from './styles';
export const Breadcrumb = Radium(class extends React.Component {
  render() {
    let breadCrumbItem;
    const lastBreadCrumb = this.props.items[this.props.items.length - 1];
    return (
      <div>
        {
          this.props.items.length > 0 ? this.props.items.map((item, index) => {
            if (!item.url || item.url === '') {
              breadCrumbItem = <span style={styles.itemNoUrl} className="breadcrumb-no-url-item">{item.label}</span>;
            } else {
              breadCrumbItem = (
                <a key={index} className="breadcrumb-url-item" style={styles.itemUrl} href={item.url}>{item.label}</a>
              );
            }
            return (
              <span key={`item-${index}`}>
                {breadCrumbItem}
                {
                  item !== lastBreadCrumb ?
                    <span className="breadcrumb-separator" style={styles.separator}>{this.props.separator}</span>
                    : ''
                }
              </span>
            );
          }) : 'No breadcrumbs'
        }
      </div>
    );
  }
});

Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.defaultProps = {
  separator: '>'
};

Breadcrumb.propTypes = {
  items: React.PropTypes.array.isRequired,
  separator: React.PropTypes.string
};

export default Breadcrumb;
