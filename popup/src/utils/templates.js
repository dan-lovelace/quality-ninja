import clipboardCopy from 'copy-to-clipboard';

export const defaultTemplates = [
  {
    type: 'bug',
    label: 'Bug',
    placeholder: `Environment:&nbsp
Platform:&nbsp

Steps to reproduce:
1. Navigate to&nbsp
2.&nbsp

Screenshot/video:&nbsp
`,
  },
  {
    type: 'qa-report',
    label: 'QA Report',
    placeholder: `QA Summary:

Platforms Tested:
Chrome
Firefox
Safari

Issues Opened: 0 Total

Issues Reopened: 0 Total

Issues Verified: 0 Total
`,
  },
];

export function copyToClipboard(value) {
  // copy twice because of a bug with this dependency
  clipboardCopy(value);
  clipboardCopy(value);
}

export function formatTemplateString(value) {
  // replace non-breaking space characters with whitespace
  return value.replace(/&nbsp/g, ' ');
}
