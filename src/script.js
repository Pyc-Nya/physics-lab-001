export function getAverage(arr){
  return arr.reduce((a, c) => a + c, 0) / arr.length;
}

export function getSx(results, expCounter) {
  let sigma = 0;
  let average = getAverage(results);

  for (let i = 0; i < expCounter; i++) {
    sigma += (results[i] - average)**2;
  }

  return (
    (sigma / (expCounter * (expCounter - 1)))**0.5
  );
}

export function getSummOfAbsOfDiff(data, expCounter) {
  let output = {};
  for (let key of Object.keys(data)) {
    let sigma = 0;
    for (let j = 0; j < expCounter; j++) {
      let args = [];
      for (let k of Object.keys(data)) {
        args.push(data[k][j]);
      }
      sigma += Math.abs(data[key]["diff"](...args));
    }
    sigma /= expCounter;
    output[key] = sigma;
  }
  return output;
}

export function getSumOfDiffsSumms(summs, data) {
  let summa = 0;
  for (let [k, v] of Object.entries(summs)) {
    summa += v * data[k]["error"];
  }
  return summa;
}
