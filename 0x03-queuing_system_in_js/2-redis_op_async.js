#!/usr/bin/env node

import { createClient } from 'redis';

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = createClient(REDIS_PORT);

client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

console.log('Redis client connected to the server');

const setNewSchool = async (schoolName, value) => {
  const { err, val } = await client.set(schoolName, value);
  if (err) {
    console.log('err ', err);
  }
  if (val) {
    console.log(val);
  }
};

const displaySchoolValue = async (schoolName) => {
  try {
    const school = await client.get(schoolName);
    console.log('School: ', school);
  } catch (error) {
    console.log('err: ', error);
  }
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
