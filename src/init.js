import createFormula from "./createFormula";

export default function getResults({data, formula, expCounter}) {
  let foo = createFormula(Object.keys(data), formula);
  let results = [];

  for (let i = 0; i < +expCounter; i++) {
    let temp = [];
    for (let key of Object.keys(data)) {
      temp.push(+data[key][i]);
    }
    results.push(foo(...temp));
  }

  return results;

}