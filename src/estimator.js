/* eslint-disable linebreak-style */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  const time = data.timeToElapse;
  const impact = {};
  const severeImpact = {};
  const days = () => {
    if (data.periodType === 'days') {
  time;
} else if (data.periodType === 'weeks') {
  7 * time;
  } else if (data.periodType === 'months') {
  30 * time;
  }
 };
 const factor = (days) => {
  return Math.floor(days/3);
};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  impact.severeCasesByRequestedTime = (impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = (
    severeImpact.infectionsByRequestedTime * 0.15
  );
  const hospitalBedsAvailable = (data.totalHospitalBeds * 0.35);
  impact.hospitalBedsByRequestedTime = Math.trunc(hospitalBedsAvailable - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(hospitalBedsAvailable - severeImpact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.02);
  const getFlightUSD = (data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation);
  const convertDollarsForSevereImpact = ((severeImpact.infectionsByRequestedTime * getFlightUSD) / days);
  const convertDollarsForImpact = ((impact.infectionsByRequestedTime * getFlightUSD) / days);
  severeImpact.dollarsInFlight = Math.trunc(convertDollarsForSevereImpact);
  impact.dollarsInFlight = Math.trunc(convertDollarsForImpact);
  const output = {
    data,
    impact,
    severeImpact
  };
  return output;
};
export default covid19ImpactEstimator;
