import { useState } from "react";
import { Header } from "./Heder";
import InitData from "./InitData";
import Table from "./Table";



function Output({result}) {
  try {
    let summsOfAbsOfDiffs = [];
    for (let [k, v] of Object.entries(result["summsOfAbsOfDiffs"])) {
      summsOfAbsOfDiffs.push(<div key={k} className="list">{`${k}: ${v}`}</div>)
    }
    let results = [];
    for (let i = 0; i < result["results"].length; i++) {
      results.push(<div key={i} className="list">{result["results"][i]}</div>)
    }
    return (
      <div>
        <p style={{fontWeight: "700", marginBottom: "15px"}}>Результаты вычислений: </p>
        <div className="box-right__output">Результаты экспериментов: <div style={{paddingTop: "5px"}}>{results}</div></div>
        <div className="box-right__output">Среднее значение: {result["average"]}</div>
        <div className="box-right__output">СКО: {result["Sx"]}</div>
        <div className="box-right__output">△X: {result["deltaX"]}</div>
        <div className="box-right__output">Сумма модулей частных производных / количество экспериментов: <div style={{paddingTop: "5px"}}>{summsOfAbsOfDiffs}</div></div>
        <div className="box-right__output">Сумма от производных * приборная погрешность: {result["sumOfDiffsSumms"]}</div>
        <div className="box-right__output">среднее △X: {result["deltaAverageX"]}</div>
  
      </div>
    )
    
  } catch (error) {
    return <div></div>
  }
}

export default function Body() {
  const [varCounter, setVarCounter] = useState('');
  const [expCounter, setExpCounter] = useState('');
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState({});

  return (
    <>
      <div className="container">
        <Header />
        <div className="box">
          <div className="box__left box-left box__item">
            <InitData 
              varCounter={varCounter}
              setVarCounter={setVarCounter}
              expCounter={expCounter}
              setExpCounter={setExpCounter}
            />
            {varCounter > 0 && expCounter > 0 ? 
              <Table 
                expCounter={expCounter}
                varCounter={varCounter}
                formula={formula}
                setFormula={setFormula}
                result={result}
                setResult={setResult}
              /> : null
            }
          </div>
          <div className="box__right box-right box__item">
            <Output result={result}/>
          </div>
        </div>
      </div>
    </>
  );
}
