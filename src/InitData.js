function InitDataVariables({varCounter, onVarCounterChange}) {

    return (
        <div className="init-data__variables">
        <p className="init-data__title">Количество переменных:</p>
        <div className="init-data__input">
            <input 
            type="text" 
            placeholder={0} 
            value={varCounter}
            onChange={(e) => {
                onVarCounterChange(+e.target.value);
            }}
            />
        </div>
        </div>
    );
}
  
function InitDataExperiments({expCounter, onExpCounterChange}) {
    return (
        <div className="init-data__expreriments">
        <p className="init-data__title">Количество экспериментов:</p>
        <div className="init-data__input">
            <input 
            type="text" 
            placeholder={0} 
            value={expCounter}
            onChange={(e) => {
                onExpCounterChange(+e.target.value);
            }}
            />
        </div>
        </div>
    );
}

export default function InitData({varCounter, expCounter, setExpCounter, setVarCounter}) {
    return (
        <div className="box-left__init-data init-data">
        <InitDataVariables 
            varCounter={varCounter}
            onVarCounterChange={setVarCounter}
        />
        <InitDataExperiments
            expCounter={expCounter}
            onExpCounterChange={setExpCounter}
        />
        </div>
    )
}