/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  let factor;
  const time = data.timeToElapse;
  const impact = {};
  const severeImpact = {};
  if (data.periodType === 'days') {
    factor = Math.floor(time / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor((7 * time) / 3);
  } else if (data.periodType === 'months') {
    factor = Math.floor((30 * time) / 3);
  }
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
  impact.dollarInFlight = Math.trunc((impact.infectionsByRequestedTime * 0.65 * 1.5) / 30);
  severeImpact.dollarInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * 0.65 * 1.5) / 30);
  const output = {
    data,
    impact,
    severeImpact
  };
  return output;
};

export default covid19ImpactEstimator;
