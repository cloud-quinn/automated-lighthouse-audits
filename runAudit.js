const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');

module.exports = (urlToAudit, options = {}, config = null) => {
    return chromeLauncher.launch(options).then(browser => {
        options.port = browser.port;
        return lighthouse(urlToAudit, options, config).then(audit => {
            return browser.kill().then(() => audit.lhr)
        });
    });
};