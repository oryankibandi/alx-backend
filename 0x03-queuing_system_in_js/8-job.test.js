import kue from 'kue';
import createPushNotificationsJobs from './8-job';
import { expect } from 'chai';

const queue = kue.createQueue();

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

before(function () {
  queue.testMode.enter();
});

afterEach(function () {
  queue.testMode.clear();
});

after(function () {
  queue.testMode.exit();
});

it('Validates the jobs', () => {
  expect(createPushNotificationsJobs('job', queue)).to.throw(
    'Jobs is not an array'
  );
  expect(createPushNotificationsJobs({}, queue)).to.throw(
    'Jobs is not an array'
  );
  expect(createPushNotificationsJobs(2, queue)).to.throw(
    'Jobs is not an array'
  );

  expect(createPushNotificationsJobs(jobs, queue)).not.to.throw(
    'Jobs is not an array'
  );
});
