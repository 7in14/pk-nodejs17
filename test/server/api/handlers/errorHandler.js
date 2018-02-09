'use strict';

const Lab = require('lab');
const Code = require('code');
const ErrorHandler = require('../../../../server/api/handlers/errorHandler');

const lab = exports.lab = Lab.script();

const responseMock = {
    response(err) {
        return {
            takeover() {
                return err;
            }
        }
    }
}

lab.experiment('Error handler', () => {

    lab.test('Non joi error should be returned without processing', async () => {

        // Arrange
        const err = {
            isJoi: false,
            msg: 'Some message'
        }

        // Act
        const result = ErrorHandler.handleError(null, responseMock, err);

        // Assert
        Code.expect(result)
            .to.equal(err);
    });

    lab.test('Joi error without details should be returned without processing', async () => {

        // Arrange
        const err = {
            isJoi: true,
            details: 'foo',
            msg: 'Some message'
        }

        // Act
        const result = ErrorHandler.handleError(null, responseMock, err);

        // Assert
        Code.expect(result)
            .to.equal(err);
    });
});
