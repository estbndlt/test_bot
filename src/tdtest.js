require("dotenv").config();

const tdaclient = require("tda-api-client");

const configGetAcct = {
  accountId: 1,
  fields: "positions,orders",
  authConfig: {
    refresh_token: process.env.TD_REFRESH_TOKEN,
    client_id: process.env.TD_CONSUMER_KEY_LONG,
  },
};

const getAcctResult = async () => {
  const result = await tdaclient.accounts.getAccount(configGetAcct);

  console.log(result);
  return result;
};

getAcctResult();

const configGetMarketHrs = {
  market: "OPTION",
  date: "2021-04-04",
  apikey: process.env.TD_ACCESS_TOKEN,
};

const hrs = async () => {
  const result = await tdaclient.markethours.getSingleMarketHours(
    configGetMarketHrs
  );

  console.log(result);
  return result;
};

hrs();
