export const getLocalWallet = () => {
  const wallet = localStorage.getItem("wallet");

  if (wallet) {
    return JSON.parse(wallet);
  } else return null;
};
