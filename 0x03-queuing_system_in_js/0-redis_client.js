#!/usr/bin/env node

import { createClient } from 'redis';

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = createClient(REDIS_PORT);

client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

console.log('Redis client connected to the server');
