export default function createFormula(variables, formula) {
  const dynamicFunction = new Function(...variables, `return ${formula}`);
  return dynamicFunction;
}