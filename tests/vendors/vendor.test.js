const AWS = require('aws-sdk');
const { postPickupMessage, pollVendorQueue } = require('../../src/vendors/vendor');

jest.mock('aws-sdk');

describe('Vendor Function Tests', () => {
  beforeAll(() => {
    // AWS.config.update = jest.fn();
    // AWS.SNS = jest.fn();
    // AWS.SQS = jest.fn();
    AWS.SNS.prototype.publish = jest.fn();
    AWS.SQS.prototype.receiveMessage = jest.fn();
  });

  it('should post pickup message', () => {
    const mockData = {
      MessageId: 'mock-message-id',
    };

    // AWS.SNS.prototype.publish = jest.fn().mockImplementation((params, callback) => {
    //   callback(null, mockData);
    AWS.SNS.prototype.publish.mockImplementation((params, callback) => {
        callback(null, mockData);
    });

    const consoleLogSpy = jest.spyOn(console, 'log');

    postPickupMessage();

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

    // AWS.SQS.prototype.receiveMessage = jest.fn().mockImplementation((params, callback) => {
    //   callback(null, mockMessage);
    // });

    AWS.SQS.prototype.receiveMessage.mockImplementation((params, callback) => {
        callback(null, mockMessage);
    });

    const consoleLogSpy = jest.spyOn(console, 'log');

    pollVendorQueue();

    expect(AWS.SQS.prototype.receiveMessage).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Received message:', mockMessage.Messages[0].Body);
  });
});
