export const formatPrice = (number, digits = 2) => {
  const num = parseFloat(number);
  if (isNaN(number)) {
    return number;
  }

  const [ whole, decimal ] = num.toFixed(digits).split('.');
  const values = partition(whole.toString(), 3, true);
  const withCommas = values.reduce((acc, val) => acc === '' ? `${val}` : `${val},${acc}`, '');
  return digits === 0 ? `$${withCommas}` : `$${withCommas}.${decimal}`;
}

function partition(arr, partitionVal = 1, reverse = false) {
  if (arguments.length === 2 && typeof(arguments[1] === 'boolean')) {
    reverse = arguments[1];
    partitionVal = 1;
  }

  let result = [];

  if (reverse) {
    for (var i = arr.length; i > 0; i -= partitionVal) {
      result[result.length] = i - partitionVal < 0
        ? arr.slice(0, i)
        : arr.slice(i - partitionVal, i);
    }
    return result;
  }

  for (var i = 0; i < arr.length; i += partitionVal) {
    result[result.length] = i + partitionVal > arr.length
      ? arr.slice(i, arr.length)
      : arr.slice(i, i + partitionVal);
  }
  return result;
}