# EnergyGrid Data Aggregator Client

## Overview
This Node.js application fetches real-time telemetry data for 500 solar inverters from a legacy EnergyGrid API while respecting strict rate limits and security constraints.

## Constraints Handled
- 1 request per second (strict enforcement)
- Maximum 10 devices per request
- MD5-based signature authentication
- Retry logic for HTTP 429 and network errors
- Batched data aggregation

## Tech Stack
- Node.js
- Axios
- Native crypto module

## Setup Instructions

### Step 1: Start Mock API
```bash
cd mock-api
npm install
npm start
