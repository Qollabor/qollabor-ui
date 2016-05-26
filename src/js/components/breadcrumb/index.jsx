import React from 'react';
import styles from './styles';
export class Breadcrumb extends React.Component {

  render() {
    let breadCrumbItem;
    const lastBreadCrumb = this.props.items[this.props.items.length - 1];
    return (
      <div>
        {
          this.props.items.length > 0 ? this.props.items.map((item) => {
            if (!item.url || item.url === '' || item === lastBreadCrumb) {
              breadCrumbItem = (<span id="breadCrumbItem" style={styles.itemUrl}>{item.label}</span>);
            } else {
              breadCrumbItem = (<a id="breadCrumbItem" style={styles.itemUrl} href={item.url}>{item.label}</a>);
            }
            return (
              <span key={item.id}>
                {breadCrumbItem}
                {
                  item !== lastBreadCrumb ?
                    <span id="separator" style={styles.separator}>{this.props.separator}</span>
                    : ''
                }
              </span>
            );
          }) : 'No breadcrumbs found!'
        }
      </div>
    );
  }
}

Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.defaultProps = {
  separator: '>'
};

Breadcrumb.propTypes = {
  items: React.PropTypes.array.isRequired,
  separator: React.PropTypes.string
};

export default Breadcrumb;
