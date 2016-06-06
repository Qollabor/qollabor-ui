import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';
import { ThemeManager } from 'material-ui/lib/styles';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import { AppBarUserMenu } from '../user/components/appBarUserMenu';
import styles from './styles';
import PeopleList from '../../components/people-list';
import registry from 'app-registry';

export class Header extends React.Component {
  handleLeftNavToggle() {
    if (this.props.onLeftNavToggle) {
      this.props.onLeftNavToggle();
    }
  }

  render() {
    const theme = ThemeManager.getMuiTheme();

    const themeColorStyles = {
      backgroundColor: theme.appBar.color,
      color: theme.appBar.textColor
    };

    const config = registry.get('config');
    let caseUserList = false;
    if (this.props.showCaseUsers) {
      caseUserList = (
        <ToolbarGroup firstChild={false} lastChild={false} float="right">
          <div style={{ marginTop: '7px' }}>
            <PeopleList
              maxPeopleInList={config.case.peopleInvolved.maxPeopleInList}
              people={this.props.peopleInvolved}
            />
          </div>
        </ToolbarGroup>);
    }
    return (
      <Toolbar
        style={Object.assign({}, styles.appBar, themeColorStyles)}
      >
        <ToolbarGroup firstChild={true} lastChild={false} float="left">
          <IconButton
            tooltip="Open menu"
            iconStyle={styles.menuIcon}
            onClick={this.handleLeftNavToggle.bind(this)}
          >
            <MenuIcon
              color={theme.appBar.textColor}
            />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup firstChild={false} lastChild={false} float="left">
          <ToolbarTitle
            style={Object.assign({}, styles.title, themeColorStyles)}
            text="Cafienne"
          />
        </ToolbarGroup>
        <ToolbarGroup firstChild={false} lastChild={true} float="right">
          <div style={{ display: 'inline-block' }}><AppBarUserMenu /></div>
        </ToolbarGroup>
        {caseUserList}
      </Toolbar>
    );
  }
}

Header.displayName = 'Header';

export default Header;
