const filterCSPHeaders = function (details) {
    for (let i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
            details.responseHeaders[i].value = '';
        }
    }

    return {
        responseHeaders: details.responseHeaders
    };
};

const onHeaderFilter = { urls: ['*://*/*'], types: ['main_frame', 'sub_frame'] };
chrome.webRequest.onHeadersReceived.addListener(
    filterCSPHeaders, onHeaderFilter, ['blocking', 'responseHeaders']
);
