import React, { Fragment } from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import RefreshIcon from '@material-ui/icons/Refresh';
import WarningIcon from '@material-ui/icons/Warning';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import './style.scss';
import fields from '../../utils/fields';
import history from '../../utils/history';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      changed: false,
      showEdit: false,
      editType: null,
    };

    chrome.storage.sync.get(fields.map(field => field.id), storage => {
      const defaults = fields.reduce((acc, val, index) => index !== 1
        ? Object.assign(acc, { [val.id]: val.defaultValue })
        : Object.assign({ [acc.id]: acc.defaultValue }, { [val.id]: val.defaultValue })
      );
      const userConfig = {
        ...defaults,
        ...storage,
      };

      this.setState({
        loading: false,
        data: userConfig,
      });
    });
  }

  handleTemplateClick = type => {
    const item = localStorage.getItem(`${type}-template`);
    console.log('item', item);
  }

  handleEditClose = () => {
    this.setState({
      showEdit: false,
    });
  }

  reloadPage = () => {
    chrome.tabs.reload();
    window.close();
  }

  render() {
    const { loading, data, changed, showEdit, editType } = this.state;
    const { classes } = this.props;

    return (
      <div className='popup container'>
        <div className='popup--content'>
          {loading ? (
            <div>Loading</div>
          ) : (
            <Fragment>
              <List dense>
                <ListItem button onClick={() => this.handleTemplateClick('report')}>
                  <ListItemText primary="Copy report template" />
                  <Button onClick={() => history.push('/edit/report')}>
                    Edit
                  </Button>
                </ListItem>
                <ListItem button onClick={() => this.handleTemplateClick('bug')}>
                  <ListItemText primary="Copy bug template" />
                  <Button onClick={() => history.push('/edit/bug')}>
                    Edit
                  </Button>
                </ListItem>
              </List>
              {showEdit && (
                <div className="edit-overlay">
                  <div className="header">
                    Edit Page
                  </div>
                  <div className="body">
                    {editType}
                    TEST
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
};

export default Home;
