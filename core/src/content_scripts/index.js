import getBrowser from './utils/browser';

const browser = getBrowser();

// send message to background.js to show page action
browser.runtime.sendMessage({
  from: 'content',
  subject: 'ShowPageAction',
});
