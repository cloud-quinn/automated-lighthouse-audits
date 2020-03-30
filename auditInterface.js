const defaultMetrics = require('./metrics');
const runAudit = require('./runAudit');
const saveToS3 = require('./saveOutput/s3');
const saveToFile = require('./saveOutput/localFile');

const outputs = {
    file: 'file',
    s3: 's3',
};

module.exports = (url, metrics = defaultMetrics, output = outputs.file, options = {}) => {
    const validUrlFormat = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!url || !url.match(validUrlFormat)) {
        throw 'A valid url to audit must be provided';
    }
    runAudit(url, options).then(result => {
        const { audits, categories } = result;

        const scoreData = Object.keys(categories).reduce((newScoreData, category) => {
            const scoreDataObject = newScoreData;
            const score = categories[category].score;
            if (score) {
                scoreDataObject[category] = score;
            }
            return scoreDataObject;
        }, {});

        const metricData = metrics.reduce((newMetricData, metric) => {
            const metricDataObject = newMetricData;
            if (audits[metric]) {
                metricDataObject[audits[metric].id] = audits[metric].numericValue;
            }
            return metricDataObject;
        }, {});

        const fileData = JSON.stringify({ scores: scoreData, metrics: metricData });

        switch (output) {
            case outputs.s3:
                return saveToS3(fileData);
            case outputs.file:
            default:
                return saveToFile(fileData);
        }
    });
};