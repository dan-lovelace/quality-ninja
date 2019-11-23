import getBrowser from './utils/browser';

const browser = getBrowser();
browser.runtime.onInstalled.addListener(() => {
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlMatches: '.*',
            },
          }),
        ],
        actions: [new browser.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

browser.commands.onCommand.addListener(command => {
  console.log('command:', command);
  switch (command) {
    case 'copy-bug-template':
      console.log('copying bug template');
      break;

    case 'copy-qa-report-template':
      console.log('copying qa report template');
      break;

    default:
  }
});
