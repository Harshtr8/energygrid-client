# EnergyGrid Data Aggregator Client

## Overview
Node.js client application to fetch telemetry data for 500 devices from the EnergyGrid API while respecting strict rate limits, batching constraints, and signature-based authentication.

---

## Constraints Handled
- Rate limit: 1 request per second
- Batch size: Maximum 10 devices per request
- Security: MD5 signature authentication

---

## Tech Stack
- Node.js
- Axios
- Crypto (MD5)

---

## Project Structure
```

energygrid-client/
├── src/
│   ├── index.js
│   ├── aggregator.js
│   ├── apiClient.js
│   ├── signer.js
│   └── config.js
├── package.json
└── README.md

````

---

## Setup & Run

### Start Mock API
```bash
cd mock-api
npm install
npm start
````

### Run Client

```bash
cd energygrid-client
npm install
npm start
```

---

## Output

* Fetches data for 500 devices
* Processes 50 batches (10 devices per request)
* Total execution time ≈ 50 seconds

---

## Implementation Summary

* Generated 500 serial numbers (`SN-0` to `SN-499`)
* Batched requests with enforced 1-second delay
* Added MD5 request signature and timestamp headers
* Implemented retry handling for failures