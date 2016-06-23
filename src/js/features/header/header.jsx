import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { IconButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import StartCaseIcon from 'material-ui/svg-icons/av/play-arrow';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
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
    const theme = getMuiTheme();

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
              maxPeopleInList={config.case.caseTeam.maxPeopleInList}
              people={this.props.caseTeam}
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
        <ToolbarGroup style={{ flexGrow: '4' }} firstChild={false} lastChild={false} float="left">
          <ToolbarTitle
            style={Object.assign({}, styles.title, themeColorStyles)}
            text="Cafienne"
          />
        </ToolbarGroup>
        {caseUserList}
        <ToolbarGroup firstChild={false} lastChild={true} float="right">
          <IconButton
            tooltip="Start New Case"
            label="Start Case"
            iconStyle={styles.menuIcon}
            linkButton={true}
            href="#/casemodels"
          >
            <StartCaseIcon color={theme.appBar.textColor} />
          </IconButton>
          <div style={{ display: 'inline-block' }}><AppBarUserMenu /></div>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

Header.displayName = 'Header';

export default Header;
