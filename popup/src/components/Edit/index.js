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
import Input from '@material-ui/core/Input';

import './style.scss';
import history from '../../utils/history';
import { defaultTemplates } from '../../utils/templates';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    const defaultTemplate = defaultTemplates.find(template => template.type === props.match.params.type);
    const { type } = defaultTemplate;

    this.state = {
      loading: true,
      data: null,
      changed: false,
      showEdit: false,
      editType: null,
      template: localStorage.getItem(`${type}-template`),
      type,
      defaultTemplate,
    };
  }

  handleSave = () => {
    const { template, type } = this.state;

    localStorage.setItem(`${type}-template`, template);
    history.push('/popup');
  }

  reloadPage = () => {
    chrome.tabs.reload();
    window.close();
  }

  render() {
    const { loading, data, changed, showEdit, editType, template, defaultTemplate } = this.state;
    const { classes, match: { params } } = this.props;

    return (
      <div className='popup container'>
        <div className='popup--content'>
          <div>
            Editing {params.type} template
          </div>
          <div>
            <Input
              value={template}
              onChange={({ target: { value }}) => this.setState({ template: value })}
              multiline
              fullWidth
              placeholder={defaultTemplate.placeholder}
              rows="12"
              variant="outlined"
              margin="normal"
            />
          </div>
          <div>
            <Button onClick={() => history.push('/popup')}>
              Back
            </Button>
            <Button onClick={this.handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Edit;
