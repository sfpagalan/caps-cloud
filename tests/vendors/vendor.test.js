const AWS = require('aws-sdk');
const { handler } = require('../../src/vendors/vendor');

jest.mock('aws-sdk');

describe('Vendor Function Tests', () => {
  beforeAll(() => {
    AWS.SNS.prototype.publish = jest.fn();
    AWS.SQS.prototype.receiveMessage = jest.fn();
  });

  it('should post pickup message', () => {
    const mockData = {
      MessageId: 'mock-message-id',
    };

    AWS.SNS.prototype.publish.mockImplementation((params, callback) => {
      callback(null, mockData);
    });

    const consoleLogSpy = jest.spyOn(console, 'log');

    handler();

    expect(AWS.SNS.prototype.publish).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Pickup message sent:', mockData.MessageId);
  });

  it('should poll vendor queue', () => {
    const mockMessage = {
      Messages: [
        {
          Body: 'Ore wa kaizoku-ō ni naru otoko da!',
        },
      ],
    };

    AWS.SQS.prototype.receiveMessage.mockImplementation((params, callback) => {
      callback(null, mockMessage);
    });

    const consoleLogSpy = jest.spyOn(console, 'log');

    handler();

    expect(AWS.SQS.prototype.receiveMessage).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Received message:', mockMessage.Messages[0].Body);
  });
});
