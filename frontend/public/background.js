chrome.action.onClicked.addListener((tab) => {
  console.log('Action clicked for tab', tab.id);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error injecting script:', chrome.runtime.lastError.message);
      return;
    }
    console.log('Script injected, sending message');
    chrome.tabs.sendMessage(tab.id, { action: 'toggle_notebox' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError.message);
      } else {
        console.log('Message sent, response:', response);
      }
    });
  });
});
