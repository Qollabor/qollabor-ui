import React from 'react';
import { debounce } from 'lodash';
import { Table, Column } from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import { ColumnPicker } from './columnPicker';
import { ActionChooserCell, StatusCell } from './cells.jsx';

// Handles all <Table> to make it responsive
class ResponsiveTableWrapper extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tableWidth: this.props.containerWidth,
      tableHeight: this.props.containerHeight,
      showColumnChooser: this.props.showColumnChooser,
      showActionSelector: this.props.showActionSelector,
      showStatusIcon: this.props.showStatusIcon
    };
  }

  componentDidMount () {
    this.handleResize();
    this.handleResize = debounce(
      this.handleResize,
      this.props.refreshRate
    ).bind(this);
    this.attachResizeEvent(this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.containerWidth !== nextProps.containerWidth) {
      this.handleResize();
    }
  }

  componentWillUnmount () {
    const win = window;

    if (win.removeEventListener) {
      win.removeEventListener('resize', this.handleResize, false);
    } else if (win.detachEvent) {
      win.detachEvent('resize', this.handleResize);
    } else {
      win.onresize = null;
    }
  }

  attachResizeEvent (func) {
    const win = window;

    if (win.addEventListener) {
      win.addEventListener('resize', func, false);
    } else if (win.attachEvent) {
      win.attachEvent('resize', func);
    } else {
      win.onresize = func;
    }
  }

  handleResize () {
    const padding = this.props.padding;

    const widthOffset = window.innerWidth < 600 // eslint-disable-line
      ? padding.leftRight / 3 :
      (window.innerWidth < 1000 ? padding.leftRight / 2 : padding.leftRight);

    this.setState({
      tableWidth: this.props.containerWidth - widthOffset,
      tableHeight: this.props.containerHeight
    });
  }

  render () {
    const columns = this.props.columns ? this.props.columns : [];

    return (<div>
      {this.state.showColumnChooser &&
        <ColumnPicker
          style={{ position: 'absolute', left: this.state.tableWidth - 24, top: '5px', zIndex: 1000 }}
          columns={columns} onMenuItemClicked={this.props.onColumnVisibilityToggle}
        />
      }
      <Table
        width={this.state.tableWidth}
        height={this.state.tableHeight} {...this.props}
      >
        {this.state.showStatusIcon &&
          <Column
            cell={<StatusCell {...this.props} />}
            width={30}
          />}

        {this.props.children
          .map((columnDefinition) => {
            // Check if Column chooser exist or column is in visible state
            const isColumnHidden = columns.find((elmt) =>
              (elmt.key === columnDefinition.props.columnKey && elmt.visible === false));

            // Do not render the column if hidden via column picker.
            if (!isColumnHidden) {
              return (
                <Column
                  key={columnDefinition.props.columnKey}
                  columnKey={columnDefinition.props.columnKey}
                  header={columnDefinition.props.header}
                  cell={columnDefinition.props.cell}
                  flexGrow={columnDefinition.props.flexGrow}
                  width={columnDefinition.props.width}
                />);
            }
            return '';
          }
          )}

        {this.state.showActionSelector &&
          <Column
            cell={<ActionChooserCell {...this.props} />}
            width={50}
          />
          }
      </Table>
    </div>);
  }
}

ResponsiveTableWrapper.propTypes = {
  children: React.PropTypes.array,
  columns: React.PropTypes.array,
  containerHeight: React.PropTypes.number,
  containerWidth: React.PropTypes.number,
  onColumnVisibilityToggle: React.PropTypes.func,
  padding: React.PropTypes.object,
  refreshRate: React.PropTypes.number,
  showActionSelector: React.PropTypes.bool,
  showColumnChooser: React.PropTypes.bool,
  showStatusIcon: React.PropTypes.bool
};

ResponsiveTableWrapper.defaultProps = {
  refreshRate: 200, // ms
  padding: { topBottom: 210, leftRight: 80 }
};

export default Dimensions()(ResponsiveTableWrapper);
