import React from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import './style.scss';
import history from '../../utils/history';
import { defaultTemplates } from '../../utils/templates';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    const defaultTemplate = defaultTemplates.find(template => template.type === props.match.params.type);
    const { type, placeholder } = defaultTemplate;
    const formattedPlaceholder = placeholder.replace(/&nbsp/g, ' ');

    this.state = {
      templateText: localStorage.getItem(`${type}-template`) || formattedPlaceholder,
      placeholder: formattedPlaceholder,
      defaultTemplate,
    };
  }

  handleSave = () => {
    const { templateText, defaultTemplate } = this.state;

    localStorage.setItem(`${defaultTemplate.type}-template`, templateText);
    history.push('/popup');
  }

  render() {
    const { templateText, placeholder, defaultTemplate: { label } } = this.state;

    return (
      <div className="edit-page">
        <div className="heading">
          Editing {label} template
        </div>
        <div className="body">
          <TextField
            value={templateText}
            onChange={({ target: { value }}) => this.setState({ templateText: value })}
            multiline
            fullWidth
            placeholder={placeholder}
            rows="15"
            variant="outlined"
            margin="normal"
          />
        </div>
        <div className="actions">
          <Button
            onClick={() => history.push('/popup')}
          >
            Back
          </Button>
          <Button
            className="save-button"
            onClick={this.handleSave}
            color="primary"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
};

export default Edit;
