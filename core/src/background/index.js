import getBrowser from '../content_scripts/utils/browser';

const browser = getBrowser();

browser.runtime.onMessage.addListener((msg, sender) => {
  // validate the message's structure
  if (msg.from === 'content' && msg.subject === 'ShowPageAction') {
    // enable the page-action for the requesting tab
    browser.pageAction.show(sender.tab.id);
  }
});
