export function getIntl(): Intl.NumberFormat {
  const intl = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  });
  return intl;
}
