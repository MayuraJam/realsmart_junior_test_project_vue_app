export function formatThaiDate (dateString) {
  const date = new Date(dateString.split("/").reverse().join("-"));
  const option = {
    day: "2-digit",
    month: "short",
  };
  return new Intl.DateTimeFormat("th-TH", option).format(date);
};
