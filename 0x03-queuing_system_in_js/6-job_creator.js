import kue from 'kue';

const queue = kue.createQueue();

const data = {
  phoneNumber: '+254701724629',
  message: 'This is a notification',
};

let job = queue.create('push_notification_code', data).save(function (err) {
  if (!err) console.log('Notification job created: ', job.id);
});

job.on('complete', (result) => {
  console.log('Notification job completed');
});

job.on('failed', (err) => {
  console.log('Notification job failed');
});
