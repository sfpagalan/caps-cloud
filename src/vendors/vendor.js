const AWS = require('aws-sdk');
const uuid = require('uuid');

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

function postPickupMessage() {
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

  sns.publish(params, (err, data) => {
    if (err) {
      console.error('Error publishing pickup message:', err);
    } else {
      console.log('Pickup message sent:', data.MessageId);
    }
  });
}

function pollVendorQueue() {
  const params = {
    QueueUrl: vendorQueueUrl,
    AttributeNames: ['All'],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ['All'],
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0,
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.error('Error receiving messages:', err);
    } else if (data.Messages) {
      const message = data.Messages[0];
      console.log('Received message:', message.Body);
    }
  });
}

setInterval(postPickupMessage, 5000);

setInterval(pollVendorQueue, 10000);

module.exports = { postPickupMessage, pollVendorQueue };