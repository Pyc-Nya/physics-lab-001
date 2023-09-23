import getResults from "./init";
import createFormula from "./createFormula";
import { getAverage, getSx, getSumOfDiffsSumms, getSummOfAbsOfDiff } from "./script";

const student = {
  2: 12.7,
  3: 4.3,
  4: 3.2,
  5: 2.8, 
  6: 2.6,
  7: 2.5,
  8: 2.4,
  9: 2.3,
  10: 2.3,
  100: 2.0,
}

export default function getResult({data, expCounter, formula}) {
  let newData = {...data};
  for (let key of Object.keys(data)) {
    newData[key]["diff"] = createFormula(Object.keys(data), data[key]["_diff"]);
  }

  let results = getResults({data: newData, expCounter: expCounter, formula: formula});
  let t = student[+expCounter];

  let average = getAverage(results);
  let Sx = getSx(results, expCounter);
  let deltaX = t * Sx;
  let summsOfAbsOfDiffs = getSummOfAbsOfDiff(newData, expCounter);
  let sumOfDiffsSumms = getSumOfDiffsSumms(summsOfAbsOfDiffs, newData);
  let deltaAverageX = (deltaX**2 + sumOfDiffsSumms**2) ** 0.5;

  return {
    "results": results,
    "average": average, 
    "Sx": Sx, 
    "deltaX": deltaX, 
    "summsOfAbsOfDiffs": summsOfAbsOfDiffs, 
    "sumOfDiffsSumms": sumOfDiffsSumms, 
    "deltaAverageX": deltaAverageX,
  }
}
