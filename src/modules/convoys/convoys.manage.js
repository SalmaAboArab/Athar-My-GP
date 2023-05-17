import charityModel from "../../../database/models/charity.js";
import countryModel from "../../../database/models/country.js";

export const validateDates = (startDate, endDate) => {
  const now = new Date();
  const isValidStartDate = startDate instanceof Date && startDate > now;
  const isValidEndDate =
    endDate === null || (endDate instanceof Date && endDate > startDate);
  return isValidStartDate && isValidEndDate;
};

export const findCountryAndCharity = async(countryId , charityId)=>{
    const [findCharity, findCountry] = await Promise.all([
        charityModel.findById(charityId),
        countryModel.findById(countryId),
      ]);
    return [findCharity, findCountry]
}