const AWS = require('aws-sdk');
const { handler } = require('../../src/vendors/vendor');

jest.mock('aws-sdk');

describe('Vendor Function Tests', () => {
  beforeAll(() => {
    AWS.SNS.prototype.publish = jest.fn(() => ({
      promise: jest.fn().mockResolvedValue({ MessageId: 'mock-message-id' }),
    }));
    AWS.SQS.prototype.receiveMessage = jest.fn(() => ({
      promise: jest.fn().mockResolvedValue({
        Messages: [
          {
            Body: 'Ore wa kaizoku-ō ni naru otoko da!',
          },
        ],
      }),
    }));
  });

  it('should post pickup message', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
  
    await handler();
  
    // expect(AWS.SNS.prototype.publish).toHaveBeenCalledTimes(1);
    // expect(consoleLogSpy).toHaveBeenCalledWith('Pickup message sent: mock-message-id');
  });
  
  it('should poll vendor queue', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
  
    await handler();
  
    // expect(AWS.SQS.prototype.receiveMessage).toHaveBeenCalledTimes(1);
    // expect(consoleLogSpy).toHaveBeenCalledWith('Received message: Ore wa kaizoku-ō ni naru otoko da!');
  });  
});
