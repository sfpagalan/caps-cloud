const AWS = require('aws-sdk');
const { handler } = require('../../src/drivers/driver');

jest.mock('aws-sdk');

describe('Driver Function Tests', () => {
  beforeAll(() => {
    AWS.SQS.prototype.receiveMessage = jest.fn(() => ({
      promise: jest.fn().mockResolvedValue({
        Messages: [
          {
            Body: JSON.stringify({
              orderId: '12345',
              vendorUrl: 'mock-vendor-url',
            }),
          },
        ],
      }),
    }));
  });

  it('should retrieve and deliver packages', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
  
    await handler();
  
    // expect(AWS.SQS.prototype.receiveMessage).toHaveBeenCalledTimes(1);
    // expect(consoleLogSpy).toHaveBeenCalledWith(
    //   'Received package: {"orderId":"12345","vendorUrl":"mock-vendor-url"}'
    // );
  });  
});