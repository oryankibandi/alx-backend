#!/usr/bin/env node

import { createClient } from 'redis';

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = createClient(REDIS_PORT);

client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

console.log('Redis client connected to the server');

const publishMessage = async (message, time) => {
  setTimeout(async () => {
    console.log('About to send MESSAGE');
    await client.publish('holberton school channel', message);
  }, time);
};

publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
