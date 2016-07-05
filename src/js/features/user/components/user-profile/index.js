import { connect } from 'react-redux';
import UserProfileDialogComponent from './userProfileDialog';


function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch({ type: 'USER:PROFILE:INIT' });
    },
    saveData: (data) => {
      dispatch({ type: 'USER:PROFILE:UPDATE', data });
    }
  };
}

const mapStateToProps = (state) => state.user.toJS();


export const UserProfileDialog = connect(mapStateToProps, mapDispatchToProps)(UserProfileDialogComponent);

