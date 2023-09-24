import { useState } from "react";
import { Header } from "./Header";
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
      results.push(<div key={i} style={{paddingLeft: "1.5em", marginBottom: "0.3em"}}>{i+1}. {result["results"][i]}</div>)
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

function Body({isOpen, setIsOpen}) {
  const [varCounter, setVarCounter] = useState('');
  const [expCounter, setExpCounter] = useState('');
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState({});

  return (
    <>
      <div className="container">
        <Header setIsOpen={setIsOpen} isOpen={isOpen} />
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

function Manual({setIsOpen, isOpen}) {
  return (
    <>
      <div className="kek">
        <div className="lmao">В соответствующие инпуты (окошко ввода) вводите соответствующие значения, в противном случае калькулятор
        работать не будет. Если вам внутри инпута выдало NaN, то обновите страницу. <br /><br />  Var - это поле для переменных, 
        Θ - для приборных погрешностей, остальные - для результатов измерений. <br /><br />  Формулу нужно вводить как в питоне. Если в ней есть знак
        минуса, то, разумеется, надо ставить скобки, иначе ничего не отобразится. <br /><br />  Все результаты вводим в СИ, никаких мм, см, мг, мс, тонн, км 
        быть не должно.<br /> <br /> Никаких единиц измерения не указывать, только числа и названия переменных </div>
        <div className="lol" onClick={() => setIsOpen(!isOpen)}>ВЕРНУТЬСЯ К КАЛЬКУЛЯТОРУ</div>
      </div>
    </>
  )
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    return <Manual setIsOpen={setIsOpen} isOpen={isOpen} />
  } else {
    return <Body setIsOpen={setIsOpen} isOpen={isOpen} />
  }
}
