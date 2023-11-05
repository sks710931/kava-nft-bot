const { NetworkContracts, PageTracker } = require("../schema/contracts");
const { default: axios } = require("axios");
const fs = require("fs");
module.exports = async function readContracts() {
  try {
    console.log("read Contracts");
    const trackerData = await PageTracker.findOne().exec();
    if (trackerData) {
      console.log(`Processing Page ${trackerData.nextPageNumber}`);
      const result = await axios.get(
        `${process.env.KAVA_API}?module=contract&action=listcontracts&page=${trackerData.nextPageNumber}&offset=10`
      );
      console.log("Contract Fetch Completed");
      console.log("Contracts Fetched :", result.data.result.length);
        const contracts = result.data.result;
          fs.writeFileSync(
            `src/data/page-${trackerData.nextPageNumber}.json`,
            JSON.stringify(contracts, {}, 4), 'utf-8'
          );
          console.log("inserted contract page");
      if (result.data.result.length === 10) {
        try {
          const tracker = await PageTracker.findOne().exec();
          tracker.nextPageNumber = tracker.nextPageNumber + 1;
          tracker.processedPageNumber = tracker.processedPageNumber + 1;
          await tracker.save();
          console.log("Updated Tracker");
        } catch (e) {
          console.log("skipped page", e);
        }
      } 
    } else {
      const tracker = new PageTracker({
        nextPageNumber: 1,
        processedPageNumber: 0,
      });
      await tracker.save();
      console.log("Created Tracker");
    }
  } catch (e) {
    console.log("Error fetching contracts:", e.message);
    console.log("Error", e);
  }
};
