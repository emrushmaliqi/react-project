export const compactPrice = Intl.NumberFormat("en-US", {
  notation: "compact",
  currency: "USD",
  style: "currency",
});

export const compactNumber = Intl.NumberFormat("en-US", {
  notation: "compact",
});

export const number = Intl.NumberFormat("en-US", { maximumFractionDigits: 7 });

export const price = Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  maximumFractionDigits: 7,
});
