const axios = require("axios");
const { generateSignature } = require("./signer");
const {
  BASE_URL,
  API_PATH,
  TOKEN,
  MAX_RETRIES
} = require("./config");

async function fetchBatch(snList, attempt = 1) {
  const timestamp = Date.now().toString();
  const signature = generateSignature(API_PATH, TOKEN, timestamp);

  try {
    const response = await axios.post(
      BASE_URL,
      { sn_list: snList },
      {
        headers: {
          timestamp,
          signature
        }
      }
    );

    return response.data.data;
  } catch (error) {
    const status = error.response?.status;

    if (attempt <= MAX_RETRIES) {
      console.log(
        `⚠️ Retry ${attempt}/${MAX_RETRIES} | Reason: ${status || "Network Error"}`
      );

      await new Promise(res => setTimeout(res, 1000));
      return fetchBatch(snList, attempt + 1);
    }

    console.error("❌ Batch failed permanently:", snList);
    return [];
  }
}

module.exports = { fetchBatch };