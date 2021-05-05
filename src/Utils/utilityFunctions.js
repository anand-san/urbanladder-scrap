export const numberWithCommas = (number) => {
  try {
    if (number) {
      number = typeof number !== "string" ? number.toString() : number;
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  } catch (e) {
    console.log(e);
  }
};

export function sort_by_key(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
