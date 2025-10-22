// Extension Installations
chrome.runtime.onInstalled.addListener(() => {
    console.log('NoteBoxExtension installed');

    chrome.contextMenus.create({
        id: 'scanPage',
        title: 'Scan Page With NoteBox',
        contexts: ['page', 'selection']
    });
});

// Icon click
chrome.action.onClicked.addListener(async(tab) => {
    await chrome.sidePanel.open({windowId: tab.windowId});

    chrome.tabs.sendMessage(tab.id, {action: 'extractContent'});
});

//context menu click
chrome.contextMenus.onClicked.addListener(async(info,tab) => {
    if (info.menuItemId === 'scanPage') {
        await chrome.sidePanel.open({windowId: tab.windowId});

        const selection = info.selectionText;
        if (selection) {
            chrome.runtime.sendMessage({
                action: "contentExtracted",
                data: {text: selection, type: 'selection'}
            });
        } else {
            chrome.tabs.sendMessage(tab.id, {action: 'extractContent'});
        }
    }
});

// keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
    if (command === '_excute_action') {
        const [tab] = await chrome.tabs.query({active: true, currentWindow:true});

        await chrome.sidePanel.open({windowId: tab.windowId});

        chrome.tabs.sendMessage(tab.id, {action: 'extractContent'});
    }
});

// listen message from content script and side pannel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'contentExtracted') {
        chrome.runtime.sendMessage(message);
    }
    if (message.action === 'getActiveTab') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            sendResponse({tab: tabs[0]});
        });
    }
});

