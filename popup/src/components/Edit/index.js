import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ResetIcon from '@material-ui/icons/Replay';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import './style.scss';
import history from '../../utils/history';
import { defaultTemplates, copyToClipboard } from '../../utils/templates';
import { HOME_PAGE_ROUTE } from '../../utils/routes';

function formatTemplateString(value) {
  return value.replace(/&nbsp/g, ' ');
}

function Edit(props) {
  const [templateText, updateTemplateText] = useState();
  const [placeholder, updatePlaceholder] = useState();
  const [defaultTemplate, updateDefaultTemplate] = useState();
  const { label } = props;

  useEffect(() => {
    const {
      match: {
        params: { type: typeParam },
      },
    } = props;
    const templateDefault = defaultTemplates.find(template => template.type === typeParam);
    const { type, placeholder: defaultPlaceholder } = templateDefault;
    const templateString = localStorage.getItem(`${type}-template`) || defaultPlaceholder;

    updateTemplateText(formatTemplateString(templateString));
    updatePlaceholder(formatTemplateString(defaultPlaceholder));
    updateDefaultTemplate(templateDefault);
  }, []);

  const handleBackClick = () => {
    history.push(HOME_PAGE_ROUTE);
  };

  const handleResetClick = () => {
    updateTemplateText(placeholder);
  };

  const handleSaveClick = () => {
    localStorage.setItem(`${defaultTemplate.type}-template`, templateText);
    copyToClipboard(templateText);
    window.close();
  };

  return (
    <div className="edit-page">
      <div className="heading">
        Editing {label} template
        <Tooltip title="Reset to default">
          <ResetIcon size="small" className="reset-button" onClick={handleResetClick} />
        </Tooltip>
      </div>
      <div className="body">
        <TextField
          value={templateText}
          onChange={({ target: { value } }) => updateTemplateText(formatTemplateString(value))}
          multiline
          fullWidth
          placeholder={placeholder}
          rows="15"
          variant="outlined"
          margin="normal"
        />
      </div>
      <div className="actions">
        <Button onClick={handleBackClick}>Back</Button>
        <Button
          className="save-button"
          onClick={handleSaveClick}
          color="primary"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save & Copy
        </Button>
      </div>
    </div>
  );
}

export default Edit;
