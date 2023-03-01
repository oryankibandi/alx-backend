#!/usr/bin/env node

import { createClient } from 'redis';

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = createClient(REDIS_PORT);

client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

console.log('Redis client connected to the server');

client.hset('HolbertonSchools', 'Portland', 50, (err, val) => {
  if (err) {
    console.log('err: ', err);
  }
  if (val) {
    console.log('Reply: 1');
  }
});
client.hset('HolbertonSchools', 'Seattle', 80, (err, val) => {
  if (err) {
    console.log('err: ', err);
  }
  if (val) {
    console.log('Reply: 1');
  }
});
client.hset('HolbertonSchools', 'New York', 20, (err, val) => {
  if (err) {
    console.log('err: ', err);
  }
  if (val) {
    console.log('Reply: 1');
  }
});
client.hset('HolbertonSchools', 'Bogota', 20, (err, val) => {
  if (err) {
    console.log('err: ', err);
  }
  if (val) {
    console.log('Reply: 1');
  }
});
client.hset('HolbertonSchools', 'Cali', 40, (err, val) => {
  if (err) {
    console.log('err: ', err);
  }
  if (val) {
    console.log('Reply: 1');
  }
});
client.hset('HolbertonSchools', 'Paris', 2, (err, val) => {
  if (err) {
    console.log('err: ', err);
  }
  if (val) {
    console.log('Reply: 1');
  }
});

client.hgetall('HolbertonSchools', (err, val) => {
  if (err) {
    console.log('Err: ', err);
  }
  if (val) {
    console.log(val);
  }
});
