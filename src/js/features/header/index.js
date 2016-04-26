import _component from './component';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    menuItemCategory: state.app.get('menuItemCategory')
  };
}

export const Header = connect(mapStateToProps, null)(_component);
