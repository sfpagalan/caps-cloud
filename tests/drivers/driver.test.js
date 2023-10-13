const AWS = require('aws-sdk');
const { handler } = require('../../src/drivers/driver');

jest.mock('aws-sdk');

describe('Driver Function Tests', () => {
  beforeAll(() => {
    AWS.SQS.prototype.receiveMessage = jest.fn();
  });

  it('should retrieve and deliver packages', () => {
    const mockMessage = {
      Messages: [
        {
          Body: JSON.stringify({
            orderId: '12345',
            vendorUrl: 'mock-vendor-url',
          }),
        },
      ],
    };

    AWS.SQS.prototype.receiveMessage.mockImplementation((params, callback) => {
      callback(null, mockMessage);
    });

    const consoleLogSpy = jest.spyOn(console, 'log');

    handler();

    expect(AWS.SQS.prototype.receiveMessage).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Received package:', mockMessage.Messages[0].Body);
  });
});
