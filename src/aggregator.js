const { fetchBatch } = require("./apiClient");
const {
  TOTAL_DEVICES,
  BATCH_SIZE,
  RATE_LIMIT_MS
} = require("./config");

function generateSerialNumbers() {
  return Array.from(
    { length: TOTAL_DEVICES },
    (_, i) => `SN-${i}`
  );
}

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function aggregateData() {
  const serialNumbers = generateSerialNumbers();
  const batches = chunkArray(serialNumbers, BATCH_SIZE);

  const aggregatedResults = [];

  for (let i = 0; i < batches.length; i++) {
    console.log(`🚀 Processing batch ${i + 1}/${batches.length}`);

    const batchResult = await fetchBatch(batches[i]);
    aggregatedResults.push(...batchResult);

    // Enforce strict 1 req/sec
    if (i < batches.length - 1) {
      await new Promise(res => setTimeout(res, RATE_LIMIT_MS));
    }
  }

  return aggregatedResults;
}

module.exports = { aggregateData };