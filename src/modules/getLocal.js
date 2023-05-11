export const getLocalWallet = () => {
  const wallet = localStorage.getItem("wallet");

  if (wallet) {
    return JSON.parse(wallet);
  } else return null;
};

export const getLocalWatchList = () => {
  const watchList = localStorage.getItem("watchlist");

  if (watchList) {
    return JSON.parse(watchList);
  } else return [];
};
