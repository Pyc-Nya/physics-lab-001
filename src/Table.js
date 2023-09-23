import { useState, useEffect } from "react";
import getResult from "./getResult";

const teta = 'Θ';




function Formula({formula, setFormula, data, setResult, expCounter}) {
  useEffect(() => {
    let output;
  
    try {
      output = getResult({data, expCounter, formula});
    } catch (error) {
      output = error;
    }
    setResult(output);
    
  }, [formula]);
  return (
    <div className="box-left__formula formula">
      <p className="formula__title">Формула:</p>
      <input 
        type="text" 
        className="formula__input" 
        placeholder="f(x)"
        value={formula}
        onChange={e => setFormula(e.target.value)}
      />
    </div>
  )
}

function Derrivates({data, setData, setResult, expCounter, formula}) {
  useEffect(() => {
    let output;
  
    try {
      output = getResult({data, expCounter, formula});
    } catch (error) {
      output = error;
    }
    setResult(output);
    
  }, [data]);
  let rows = [];
  rows.push(<div className="formula__title">Производные:</div>)
  for (let key of Object.keys(data)) {
    if (key != '') {
      rows.push(<div><span>d / d{key}: </span><input 
        type="text" 
        className="formula__input" 
        placeholder="f(x)"
        value={data[key]["_diff"]}
        onChange={e => {
          let newData = {...data};
          newData[key]["_diff"] = e.target.value;
          setData(newData);
        }}
      /></div>);
    }
  }
  return (<>{rows}</>);
}

export default function Table({varCounter, expCounter, formula, setFormula, result, setResult}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [data, setData] = useState({});
  let initialData = [];
  if (expCounter < 5 && windowWidth >= 1000) {
    for (let i = 0; i < varCounter; i++) {
      let temp = [];
      for (let j = 0; j < +expCounter + 2; j++) {
        temp.push('');
      }
      initialData.push(temp);
    } 
  } else {
    for (let i = 0; i < +expCounter + 2; i++) {
      let temp = [];
      for (let j = 0; j < varCounter; j++) {
        temp.push('');
      }
      initialData.push(temp);
    } 
  }
  let [arr, setArr] = useState(initialData);
  if (arr.length != initialData.length) arr = initialData;
  let rows = [];

  useEffect(() => {
    let newData = {};
    if (+expCounter < 5 && windowWidth >= 1000) {
      for (let i = 0; i < varCounter; i++) {
        newData[arr[i][0]] = {};
      }
      for (let i = 0; i < varCounter; i++) {
        for (let j = 1; j < +expCounter + 1; j++) {
          newData[arr[i][0]][j-1] = +arr[i][j];
        }
      }
      for (let i = 0; i < varCounter; i++) {
        newData[arr[i][0]]["error"] = arr[i][+expCounter+1];
        newData[arr[i][0]]["_diff"] = "";
      }
      
      setData(newData);
      let output;
    
      try {
        output = getResult({data, expCounter, formula});
      } catch (error) {
        output = error;
      }
      setResult(output);
    } else {
      for (let i = 0; i < varCounter; i++) {
        newData[arr[0][i]] = {};
      }
      for (let i = 0; i < varCounter; i++) {
        for (let j = 1; j < +expCounter+1; j++) {
          newData[arr[0][i]][j-1] = +arr[j][i];
        }
      }
      for (let i = 0; i < varCounter; i++) {
        newData[arr[0][i]]["error"] = arr[+expCounter+1][i];
        newData[arr[0][i]]["_diff"] = "";
      }
      
      setData(newData); 
      let output;
    
      try {
        output = getResult({data, expCounter, formula});
      } catch (error) {
        output = error;
      }
      setResult(output);
    }
     
  }, [arr]);

  let row = [];
  if (expCounter < 5 && windowWidth >= 1000) {
    row.push(<td key={0} style={{padding: "0.2em"}}>Var</td>);
    for (let i = 0; i < +expCounter; i++) {
      row.push(<td key={i+1} style={{padding: "0.2em"}}>{i + 1}</td>);
    }
    row.push(<td key={+expCounter + 1} style={{padding: "0.2em"}}>{teta}</td>);
    rows.push(<tr key={0}>{row}</tr>);
    row = [];

    for (let i = 0; i < varCounter; i++) {
      row = [];
      for (let j = 0; j < +expCounter + 2; j++) {
        row.push(<td key={j}><input type="text" value={arr[i][j]} onChange={e => {
          let newArr = [...arr];
          newArr[i][j] = e.target.value;
          setArr(newArr);
        }}></input></td>);
      }
      rows.push(<tr key={i+1}>{row}</tr>);
    } 

  } else {

    for (let i = 0; i < +expCounter + 2; i++) {
      row = [];
      for (let j = 0; j < +varCounter; j++) {
        if (!j && !i) row.push(<td key={i.toString() + ' ' + j.toString()}>Var</td>);
        else if (!j && i == +expCounter + 1) row.push(<td key={i.toString() + ' ' + j.toString()}>{teta}</td>);
        else if (!j) row.push(<td key={i.toString() + ' ' + j.toString()}>{i}</td>);
        row.push(<td key={i.toString() + ' ' + (j+1).toString()}><input type="text" value={arr[i][j]} onChange={e => {
          let newArr = [...arr];
          newArr[i][j] = e.target.value;
          setArr(newArr);
        }}></input></td>);
      }
      rows.push(<tr key={i}>{row}</tr>)
    }
  }




  return (
    <>
      <table className="table-data">
        <thead></thead>
        <tbody>{rows}</tbody>
      </table>
      <Formula 
        formula={formula} 
        setFormula={setFormula} 
        data={data}
        setResult={setResult}
        expCounter={expCounter}
      />
      <Derrivates 
        data={data} 
        setData={setData} 
        setResult={setResult}
        expCounter={expCounter}
        formula={formula}
      />
    </>
  )
}