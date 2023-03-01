#!/usr/bin/env node

import { createClient } from 'redis';

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = createClient(REDIS_PORT);

client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

console.log('Redis client connected to the server');

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, (err, result) => {
    if (err) {
      console.log('err: ', err);
    }
    if (result) console.log('Reply: ', result);
  });
};

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, val) => {
    if (err) {
      console.log('err ', err);
    }
    if (val) {
      console.log(val);
    }
  });
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
