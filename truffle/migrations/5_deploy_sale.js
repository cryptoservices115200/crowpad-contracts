const CrowpadSale = artifacts.require("CrowpadSale")

duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
}

const rate = 500
const wallet = "0x052f11157A23406F2A705fE78F2695009a6Ec022"
const token = "0x119016470E88eC7228060B8b9F6049223c55D3eE"
const cap = "200000000000000000000"
const openingTime = 1642615732 + duration.weeks(1)
const closingTime = openingTime + duration.weeks(1)
const goal = "160000000000000000000"
const foundersFund = "0x43ad0f0585659a68faA72FE276e48B9d2a23B117"
const foundationFund = "0x43ad0f0585659a68faA72FE276e48B9d2a23B117"
const partnersFund = "0x43ad0f0585659a68faA72FE276e48B9d2a23B117"
const releaseTime = closingTime + duration.years(1)

module.exports = async function (deployer, networks, accounts) {
  // deploy CrowpadSale
  await deployer.deploy(
          CrowpadSale,
          rate,
          wallet,
          token,
          cap,
          openingTime,
          closingTime,
          goal,
          foundersFund,
          foundationFund,
          partnersFund,
          releaseTime
        )
}
