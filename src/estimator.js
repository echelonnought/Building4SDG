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
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** factor;
  severeImpact.severeCasesByRequestedTime = Math.floor(
    severeImpact.infectionsByRequestedTime * 0.15
  );
  const hospitalBedsAvailable = Math.floor(data.totalHospitalsBeds * 0.35);
  severeImpact.hospitalBedsByRequestedTime =
    hospitalBedsAvailable - severeImpact.severeCasesByRequestedTime;
  const output = {
    data,
    impact,
    severeImpact
  };
  return output;
};
export default covid19ImpactEstimator;
