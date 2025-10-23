if (!document.getElementById('notebox-root')) {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'notebox-root';
  rootDiv.style.position = 'fixed';
  rootDiv.style.top = '0';
  rootDiv.style.right = '0';
  rootDiv.style.height = '100vh';
  rootDiv.style.zIndex = '9999';
  rootDiv.style.display = 'none'; // Initially hidden
  document.body.appendChild(rootDiv);

  const shadowRoot = rootDiv.attachShadow({ mode: 'open' });

  const appContainer = document.createElement('div');
  appContainer.id = 'notebox-app-container';
  appContainer.style.height = '100%';
  shadowRoot.appendChild(appContainer);

  // Inject CSS
  const cssUrl = chrome.runtime.getURL('style.css');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssUrl;
  shadowRoot.appendChild(link);

  // Inject JS
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('main.js');
  script.type = 'module';
  appContainer.appendChild(script);
}

if (!(window as any).hasNoteboxListener) {
  (window as any).hasNoteboxListener = true;
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === 'toggle_notebox') {
      const rootDiv = document.getElementById('notebox-root');
      if (rootDiv) {
        if (rootDiv.style.display === 'none') {
          rootDiv.style.display = 'block';
        } else {
          rootDiv.style.display = 'none';
        }
      }
      sendResponse({ status: 'toggled' });
    }
    return true;
  });
}
