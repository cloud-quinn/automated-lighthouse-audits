const auditInterface = require('./auditInterface');
const runAudit = require('./runAudit');
const saveToS3 = require('./saveOutput/s3');
const saveToFile = require('./saveOutput/localFile');

jest.mock('./runAudit');
jest.mock('./saveOutput/s3', () => jest.fn());
jest.mock('./saveOutput/localFile', () => jest.fn());

describe('Running a Lighthouse Audit', () => {
    beforeAll(() => {
        runAudit.mockImplementation(() => Promise.resolve({
            audits: {
                interactive: {
                    id: 'interactive',
                    numericValue: 1000,
                },
            },

            categories: {
                performance: {
                    id: 'performance',
                    score: 1,
                },
            }
        }));
    });

    afterAll(() => {
        runAudit.mockClear();
    });

    it('exists', () => {
        expect(auditInterface).toBeDefined();
    });

    it('launches Lighthouse with the expected parameters', async () => {
        await auditInterface('http://bashcorp.co.uk', ['interactive']);
        expect(runAudit).toHaveBeenCalledWith('http://bashcorp.co.uk', {});
    });

    describe('saving the audit results to a local file', () => {
        beforeAll(async () => {
            await auditInterface('http://bashcorp.co.uk', ['interactive'], 'file');
        });

        afterAll(() => {
            saveToFile.mockClear();
        });

        it('calls the Save To File function', async () => {
            expect(saveToFile).toHaveBeenCalled();
        });

        it('passes the expected parameters to the Save To File function', async () => {
            expect(saveToFile).toHaveBeenCalledWith("{\"scores\":{\"performance\":1},\"metrics\":{\"interactive\":1000}}");
        });
    });

    describe('saving the audit results to an AWS S3 bucket', () => {
        beforeAll(async () => {
            await auditInterface('http://bashcorp.co.uk', ['interactive'], 's3');
        });

        afterAll(() => {
            saveToS3.mockClear();
        });

        it('calls the Save To S3 function', async () => {
            expect(saveToS3).toHaveBeenCalled();
        });

        it('passes the expected parameters to the Save To S3 function', async () => {
            expect(saveToS3).toHaveBeenCalledWith("{\"scores\":{\"performance\":1},\"metrics\":{\"interactive\":1000}}");
        });
    });

    describe('invalid url provided', () => {
        it('throws an error', async () => {
            expect(() => auditInterface('bashcorp', ['interactive'], 's3')).toThrow();
        });
    });
});