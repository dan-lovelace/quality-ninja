import React from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CopyIcon from '@material-ui/icons/FileCopy';

import './style.scss';
import { defaultTemplates, copyToClipboard } from '../../utils/templates';
import history from '../../utils/history';
import { EDIT_PAGE_ROUTE } from '../../utils/routes';

const handleTemplateClick = type => {
  const localStorageItem = localStorage.getItem(`${type}-template`);
  const defaultTemplateText = defaultTemplates.find(
    template => template.type === type,
  ).placeholder;

  copyToClipboard(localStorageItem || defaultTemplateText);
  window.close();
};

const Home = () => (
  <div className="home-page">
    <div className="heading">Templates</div>
    <List>
      {defaultTemplates.map(template => {
        const { type, label } = template;

        return (
          <ListItem key={type} button onClick={() => handleTemplateClick(type)}>
            <ListItemIcon>
              <CopyIcon />
            </ListItemIcon>
            <ListItemText primary={label} />
            <ListItemSecondaryAction>
              <Button
                onClick={() => history.push(`${EDIT_PAGE_ROUTE}/${type}`)}
              >
                Edit
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  </div>
);

export default Home;
