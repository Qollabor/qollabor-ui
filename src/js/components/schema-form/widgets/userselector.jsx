import React from 'react';
import { Popover } from 'material-ui';
import AvatarList from '../../people-list/components/avatarList';
import UserSelector from '../../user-selector';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget, fetchUserDetails } from './help';
import styles from '../styles';

import registry from 'app-registry';

export class UserSelectorWidget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      selectedUsers: []
    };
  }

  componentWillMount() {
    const selectedUser = this.getDefaultUser(this.props.formData);
    if (selectedUser) {
      const userIds = [].concat(selectedUser);
      fetchUserDetails(userIds).then(response => {
        const config = registry.get('config');
        const dataKey = '_2';

        let selectedUsers = [];
        if (config.cases.version === 1) {
          if (response.body[dataKey]) {
            selectedUsers = response.body[dataKey];
          }
        } else if (response.body) {
          selectedUsers = response.body;
        }

        this.setState({
          selectedUsers
        });
      });
    }
  }

  // If default value is $CURRENT_USER$, set the logged in user as default.
  getDefaultUser(formData) {
    let selectedUser;
    if (formData === '$CURRENT_USER') {
      const store = registry.get('store');
      selectedUser = store.getState().user.getIn(['loggedUser', 'username']);
    } else {
      selectedUser = formData;
    }
    return selectedUser;
  }

  // If multiSelect is enabled, return array of selected users else return selected user object.
  getSelectedUsers(user, selected) {
    const selectedUsers = (this.props.uiSchema.multiSelect) ? this.state.selectedUsers : [];
    const index = selectedUsers.findIndex((item) => item.uniqueId === user.uniqueId);
    if (!selected) {
      selectedUsers.splice(index, 1);
    } else if (selected && index === -1) {
      selectedUsers.push(user);
    }
    return selectedUsers;
  }

  handleOnChange(user, selected) {
    const selectedUsers = this.getSelectedUsers(user, selected);

    let selectedUserIds;
    if (selectedUsers.length > 0) {
      selectedUserIds = selectedUsers.map((item) => item.uniqueId);
      // If multiSelect is not enable, return the array element.
      if (!this.props.uiSchema.multiSelect) {
        selectedUserIds = (selectedUserIds.length > 0) ? selectedUserIds[0] : '';
      }
    }

    this.props.onChange(selectedUserIds);
    this.setState({ selectedUsers });
  }

  handleRequestOpen(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  requestRequestClose() {
    this.setState({
      open: false,
      anchorEl: null
    });
  }

  render() {
    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */

    let help = null;
    if (this.props.uiSchema && this.props.uiSchema['ui:help']) {
      help = this.props.uiSchema['ui:help'];
    }

    if (this.props.readonly) {
      return (
        <ReadOnlyWidget
          title={this.props.schema.title}
          name={this.props.name}
          value={this.props.formData}
          help={help}
        />
      );
    }

    let helpWidget = false;
    if (help) {
      helpWidget =
        <div style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}><HelpWidget help={help}/></div>;
    }

    const floatingLabelStyle = Object.assign({}, styles.floatingLabel, { lineHeight: '30px' });
    const title = this.props.schema.title + (this.props.required ? ' *' : '');
    const selectedUsers = this.state.selectedUsers ? [].concat(this.state.selectedUsers) : [];
    return (
      <div>
        {helpWidget}
        <div>
          <label style={floatingLabelStyle}>
            {title}
          </label>
          <div style={{ height: '50px' }}>
            <AvatarList
              chipView={true}
              maxPeopleInList={10}
              people={selectedUsers}
              maxLength={300}
              disabled={this.props.disabled}
              onShowMoreAction={this.handleRequestOpen.bind(this)}
            />
          </div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.requestRequestClose.bind(this)}
            bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
          >
            <UserSelector
              onUserSelectChange={this.handleOnChange.bind(this)}
              selectedUsers={selectedUsers}
            />
          </Popover>
        </div>
      </div>
    );
  }
}
