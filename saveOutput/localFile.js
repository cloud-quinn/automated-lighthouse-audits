const fs = require('fs');

module.exports = (fileData, fileName = `${Date.now()}`, outputFolder = './audits') => {
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    fs.writeFile(`${outputFolder}/${fileName}.json`, fileData, (err) => {
        if (err) throw err;
    });
};