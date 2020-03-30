const auditInterface = require('./auditInterface');

const [urlFromScript] = process.argv.slice(2);

const auditInterfaceWrapper = () => {
    try {
        return auditInterface(urlFromScript);
    }

    catch (e) {
        console.error(e.message || e);
    }
}

module.exports = auditInterfaceWrapper();