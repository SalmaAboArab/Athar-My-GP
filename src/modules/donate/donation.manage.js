import charityModel from "../../../database/models/charity.js";
import countryModel from "../../../database/models/country.js";
import financeModel from "../../../database/models/finance.js";

export const updateDonationBox = async (box, amount) => {
  box.raised += amount;
  if (box.raised >= box.amount) {
    box.left = 0;
    box.completed = true;
  } else {
    box.left = box.amount - box.raised;
  }
  return await box.save();
};

export const processFinancialTransaction = async (box, amount) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  let financeEntry = await financeModel.findOne({ date: currentDate });
  
  if (!financeEntry) {
    financeEntry = await financeModel.create({
      date: currentDate,
      finance: [],
    });
  }
  const financeEntryIndex = financeEntry.finance.findIndex(
    (f) => f.box.toString() === box._id.toString()
  );
  console.log(currentDate , financeEntry , financeEntryIndex);

  if (financeEntryIndex !== -1) {
    financeEntry.finance[financeEntryIndex].amount += amount;
  } else {
    const [country, charity] = await Promise.all([
      countryModel.findById(box.countryId),
      charityModel.findById(box.charityId),
    ]);

    financeEntry.finance.push({
      box: box._id,
      amount,
      country: country.name,
      categories: box.categories,
      charity: charity.name,
    });
  }

  await financeEntry.save();

  return financeEntry;
};
