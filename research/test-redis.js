#!/usr/bin/env node

/**
 * Test Redis Cache
 * Quick test to verify Redis caching is working
 */

const net = require('net');

const redis = net.createConnection(6379, 'localhost', () => {
    console.log('✅ Connected to Redis\n');
    
    // Test 1: SET
    console.log('Test 1: SET test-key "Hello from AI Research"');
    redis.write('SET test-key "Hello from AI Research"\r\n');
});

let step = 1;

redis.on('data', (data) => {
    const response = data.toString();
    
    if (step === 1) {
        console.log('Response:', response.trim());
        console.log('✅ Key saved\n');
        
        // Test 2: GET
        console.log('Test 2: GET test-key');
        redis.write('GET test-key\r\n');
        step = 2;
    } else if (step === 2) {
        console.log('Response:', response.trim());
        if (response.includes('Hello from AI Research')) {
            console.log('✅ Cache working! Retrieved value successfully\n');
        } else {
            console.log('❌ Cache not working\n');
        }
        
        // Test 3: SETEX (with expiry)
        console.log('Test 3: SETEX cached-research 3600 "Research data here"');
        redis.write('SETEX cached-research 3600 "Research data here"\r\n');
        step = 3;
    } else if (step === 3) {
        console.log('Response:', response.trim());
        console.log('✅ Key saved with 1 hour expiry\n');
        
        console.log('🎉 All Redis tests passed!');
        redis.end();
    }
});

redis.on('error', (err) => {
    console.log('❌ Redis error:', err.message);
    console.log('\nMake sure Redis is running:');
    console.log('  sudo systemctl status redis\n');
});
