const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const sqs = new AWS.SQS();

const pickupQueueUrl = process.env.PICKUP_QUEUE_URL;

function retrieveAndDeliverPackages() {
  const params = {
    QueueUrl: pickupQueueUrl,
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
      console.log('Received package:', message.Body);

      setTimeout(() => {

        const deliveryMessage = JSON.parse(message.Body);
        const vendorQueueUrl = deliveryMessage.vendorUrl;
        console.log('Delivering package to vendor:', vendorQueueUrl);

      }, Math.floor(Math.random() * 10000));
    }
  });
};

setInterval(retrieveAndDeliverPackages, 5000);

module.exports = { retrieveAndDeliverPackages };