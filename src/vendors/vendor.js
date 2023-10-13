const AWS = require('aws-sdk');
const uuid = require('uuid');

jest.mock('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const sns = new AWS.SNS();
const sqs = new AWS.SQS();

const pickupTopicArn = process.env.PICKUP_TOPIC_ARN;

const vendorName = 'AnimeShop';
const vendorQueueUrl = process.env.VENDOR_QUEUE_URL;

exports.handler = async (event) => {
  try {
    const orderId = uuid.v4();
    const customer = 'Monkey D. Luffy';
    const message = {
      orderId,
      customer,
      vendorUrl: vendorQueueUrl,
    };

    const params = {
      Message: JSON.stringify(message),
      TopicArn: pickupTopicArn,
    };

    const data = await sns.publish(params).promise();

    if (data.MessageId) {
      console.log('Pickup message sent:', data.MessageId);
    }

    const receiveParams = {
      QueueUrl: vendorQueueUrl,
      AttributeNames: ['All'],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ['All'],
      VisibilityTimeout: 0,
      WaitTimeSeconds: 0,
    };

    const receivedData = await sqs.receiveMessage(receiveParams).promise();

    if (receivedData.Messages) {
      const message = receivedData.Messages[0];
      console.log('Received message:', message.Body);
    }

    return 'Lambda function executed successfully';
  } catch (error) {
    console.error('Error in Lambda function:', error);
    throw error;
  }
};
