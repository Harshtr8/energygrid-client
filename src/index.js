const { aggregateData } = require("./aggregator");

(async () => {
  console.log("⚡ Starting EnergyGrid Data Aggregation...");
  const startTime = Date.now();

  const results = await aggregateData();

  const endTime = Date.now();

  console.log("✅ Aggregation Complete");
  console.log(`📊 Total Devices Fetched: ${results.length}`);
  console.log(`⏱️ Total Time: ${(endTime - startTime) / 1000}s`);

  console.log("🔍 Sample Output:");
  console.log(results.slice(0, 5));
})();
