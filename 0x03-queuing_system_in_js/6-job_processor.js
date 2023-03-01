import kue from 'kue';

const queue = kue.createQueue();

const data = {
  phoneNumber: '+254701724629',
  message: 'This is a notification',
};

const sendNotification = (phoneNumber, message) => {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
};

queue.process('push_notification_code', (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
});
