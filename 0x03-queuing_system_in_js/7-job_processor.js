import kue from 'kue';

const queue = kue.createQueue();

const blackList = ['4153518780', '4153518781'];

const sendNotification = (phoneNumber, message, job, done) => {
  if (blackList.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.on('progress', (progress, data) => {
      if (progress <= 50) {
        console.log(
          `Sending notification to ${phoneNumber}, with message: ${message}`
        );
      }
    });
  }
};

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
