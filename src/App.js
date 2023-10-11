import { useEffect } from 'react';
import { useState } from 'react';

// m / (0.03 ** 2) * (((0.15 + m) / m) * z * (9.8 / 0.23) ** 0.5)**2

// d / dm: (47343 * m**2 - 1065.22) * z ** 2 / m ** 2

// d / dz: 94686 * (m + 0.15) ** 2 * z / m

// const M = 0.253709; // 150g
const M = 0.27
// const M = 0.15; // 150g
const L = 0.23; // 230 mm
const g = 9.8; 
const tetam = 0.000001; // 0.001g
const tetaL = 0.005; // 5mm
const tetaz = 0.0005; // 0.5mm
const l = 0.23; // 120mm
const tetal = 0.005; // 5mm
const b = 0.03 // 3cm
const tetab = 0.001 // 0.1cm

const m1 = 0.006738;
const m2 = 0.013608;
const m3 = 0.019978;
const z1 = 0.0483;
const z2 = 0.0663;
const z3 = 0.08;

const data = {
  y1: getY(m1, z1),
  y2: getY(m2, z2),
  y3: getY(m3, z3),
  SummOfYIth: getY(m1, z1) + getY(m2, z2) + getY(m3, z3),

  x1: (1 / m1)**0.5,
  x2: (1 / m2)**0.5,
  x3: (1 / m3)**0.5,
  SummOfXIth: (1 / m1)**0.5 + (1 / m2)**0.5 + (1 / m3)**0.5,

  x1Power: (1 / m1),
  x2Power: (1 / m2),
  x3Power: (1 / m3),
  SummOfXPowerIth: (1 / m1) + (1 / m2) + (1 / m3),

  y1Power: getY(m1, z1)**2,
  y2Power: getY(m2, z2)**2,
  y3Power: getY(m3, z3)**2,
  SummOfYPowerIth: getY(m1, z1)**2 + getY(m2, z2)**2 + getY(m3, z3)**2,
  
  x1MulY1: (1 / m1)**0.5 * getY(m1, z1),
  x2MulY2: (1 / m2)**0.5 * getY(m2, z2),
  x3MulY3: (1 / m3)**0.5 * getY(m3, z3),
  SummOfMuls() {
    return this.x1MulY1 + this.x2MulY2 + this.x3MulY3
  },

  
}



export default function App() {
  const [m, setm] = useState('');
  const [z, setz] = useState('');
  const [y, setY] = useState('');
  const [tetay, settetay] = useState('');
  const [k, setK] = useState('');
  const [classname, setclassname] = useState('');
  const [x, setX] = useState('');

  return (
    <div className={classname}>
      <button 
      className='butt'
      style={{bottom: "calc(50% + 40px"}}
      onClick={() => {
        setm(m1);
        setz(z1);
        setclassname("green");
        }}>
      First</button>
      
      <button 
      className='butt'
      onClick={() => {
        setm(m2)
        setz(z2);
        setclassname("red");
        }}>
      Second</button>

      <button 
      className='butt'
      style={{bottom: "calc(50% - 80px"}}
      onClick={() => {
        setm(m3)
        setz(z3);
        setclassname("blue");
        }}>
      Third</button>
      
      <div>
        <p>m: </p>
        <Input val={m} setVal={setm} />
      </div>
      <div>
        <p>z: </p>
        <Input val={z} setVal={setz} />
      </div>
      <div>
        <p>y = v: </p>
        <V m={m} z={z} y={y} setY={setY} />
      </div>
      <div>
        <p>y1 = v1: </p>
        {data.y1}
        <p>y2 = v2: </p>
        {data.y2}
        <p>y3 = v3: </p>
        {data.y3}
        <p>Summ of y i-th</p>
        {data.SummOfYIth}
      </div>
      <div>
        <p>
          teta y
        </p>
        <TetaY m={m} z={z} y={y} tetay={tetay} settetay={settetay} />
      </div>
      <div>
        <p>
          x
        </p>
        <X m={m} x={x} setX={setX} />
      </div>
      <div>
        <p>x1</p>
        {data.x1}
        <p>x2</p>
        {data.x2}
        <p>x3</p>
        {data.x3}
        <p>Summ of x i-th</p>
        {data.SummOfXIth}
      </div>
      <div>
        <p>
          teta x
        </p>
        <TetaX m={m}  />
      </div>
      <div>
        <p>
          teta k
        </p>
        <TetaK m={m} y={y} k={k} tetaY={tetay} />
      </div>
      <div>
        <p>
          x1 ** 2
        </p>
        <p>{data.x1Power}</p>
        <p>
          x2 ** 2
        </p>
        <p>{data.x2Power}</p>
        <p>
          x3 ** 2
        </p>
        <p>{data.x3Power}</p>
        <p>Summ of x**2 i-th</p>
        {data.SummOfXPowerIth}
      </div>
      <div>
        <p>y1 ** 2: </p>
        {data.y1Power}
        <p>y2 ** 2: </p>
        {data.y2Power}
        <p>y3 ** 2: </p>
        {data.y3Power}
        <p>Summ of y**2 i-th</p>
        {data.SummOfYPowerIth}
      </div>
      <div>
        <p>
          x1 * y1
        </p>
        <p>{data.x1MulY1}</p>
        <p>
          x2 * y2
        </p>
        <p>{data.x2MulY2}</p>
        <p>
          x3 * y3
        </p>
        <p>{data.x3MulY3}</p>
        <p>Summ of y*x i-th</p>
        <p>{data.SummOfMuls()}</p>
      </div>
      <div>
        <p>a: </p>
        {data.SummOfMuls() / data.SummOfXPowerIth}
      </div>
      <div>
        <p>Sa:</p>
        {
        (
          (data.SummOfYPowerIth - data.SummOfXPowerIth * ((data.SummOfMuls() / data.SummOfXPowerIth)**(-2))) / 
          (2 * data.SummOfXPowerIth)
        )**0.5}
      </div>
      <div>
        <p>delta a: </p>
        {
        (
          (data.SummOfYPowerIth - data.SummOfXPowerIth * ((data.SummOfMuls() / data.SummOfXPowerIth)**(-2))) / 
          (2 * data.SummOfXPowerIth)
        )**0.5 * 4.3}
      </div>
      <div>
        <p>teta a:</p>
        {(data.SummOfXIth / data.SummOfXPowerIth) * (data.SummOfMuls() / data.SummOfXPowerIth * 0.006 + 0.13)}
      </div>
      <div style={{background: "#000", color: "#fff"}}>
        <p>Масса системы:</p>
        {M}
      </div>
      <div style={{background: "#000", color: "#fff"}}>
        <p>l:</p>
        {l}
      </div>
      <div style={{background: "#000", color: "#fff"}}>
        <p>
          k выборочное:
        </p>
        <K m={m} y={y} k={k} setK={setK} />
      </div>
      <div style={{background: "#000", color: "#fff"}}>
        <p>Перенос погрешностей k:</p>
        {(data.SummOfMuls() / data.SummOfXPowerIth / 0.03) ** 2}
      </div>
      <div style={{background: "#000", color: "#fff"}}>
        <p>P%: </p>
        {getK(m1, getY(m1, z1)) / ((data.SummOfMuls() / data.SummOfXPowerIth / 0.03) ** 2) * 100}%
        <p>P%: </p>
        {((data.SummOfMuls() / data.SummOfXPowerIth / 0.03) ** 2) * 100 / getK(m1, getY(m1, z1))}%
      </div>
      <div>
        k для выборочных
        <p>{getK(m1, data.y1)}</p>
        <p>{getK(m2, data.y2)}</p>
        <p>{getK(m3, data.y3)}</p>
      </div>
      <div>
        k среднее
        <p>{(getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3}</p>
      </div>
      <div>
        <p>Sk</p>
        {(((
          (getK(m1, data.y1) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 + 
          (getK(m2, data.y2) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 + 
          (getK(m3, data.y3) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 

        ) / (2)) ** 0.5) / (3 ** 0.5)}
      </div>
      <div>
        <p>delta k</p>
        {(((
          (getK(m1, data.y1) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 + 
          (getK(m2, data.y2) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 + 
          (getK(m3, data.y3) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 

        ) / (2)) ** 0.5) / (3 ** 0.5) * 4.3}
      </div>
      <div>
        Instrument Error: <br />
        {IthInstrumentError(m1, data.y1)} <br />
        {IthInstrumentError(m2, data.y2)} <br />
        {IthInstrumentError(m3, data.y3)}
      </div>
      <div>
        Average of Instrument Error: <br />
        {(IthInstrumentError(m1, data.y1) +
        IthInstrumentError(m2, data.y2) +
        IthInstrumentError(m3, data.y3)) / 3}
      </div>
      <div>
        <p>delta average k</p>
        {(((
          (getK(m1, data.y1) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 + 
          (getK(m2, data.y2) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 + 
          (getK(m3, data.y3) - (getK(m1, data.y1) + getK(m2, data.y2) + getK(m3, data.y3)) / 3) ** 2 

        ) / (2)) ** 0.5) / (3 ** 0.5) * 4.3 + 
        (IthInstrumentError(m1, data.y1) +
        IthInstrumentError(m2, data.y2) +
        IthInstrumentError(m3, data.y3)) / 3}
      </div>

    </div>
  );
}

function Input({val, setVal}) {
  return (
    <>
      <input 
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)} 
        placeholder='value...'
      />
    </>
  )
}


function V({m, z, y, setY}) {
  useEffect(() => {
    setY(getY(m, z))
  }, [m, z])

  return (
    <div>
      <input 
        type="text" 
        value={y} 
      />
    </div>
  )
}

function TetaY({m, z, y, tetay, settetay}) {
  useEffect(() => {
    settetay(+y * (tetam / +m + tetaz / +z + tetaL / 2 * L))
  })

  return (
    <div>
      <input 
        type="text" 
        value={tetay} 
      />
    </div>
  )
}

function X({m, x, setX}) {
  useEffect(() => {
    setX((l / +m)**0.5);
  }, [m])

  return (
    <div>{x}</div>
  )
}

function TetaX({m}) {
  return (
    tetam / (2 * m**(1.5))
  )
}

function K({m, y, k, setK}) {
  useEffect(() => {
    setK(getK(m, y))
  }, [m, y])
  return (
    <div>
      <input 
        type="text" 
        value={k} 
        style={{
          background: "#000", color: "#fff"
        }}
      />
    </div>
  )
}

function TetaK({k, m, y, tetaY}) {
  return (
    k * (tetam / m + (2 * tetab) / b + (2 * tetaY) / y)
  )
}

function getY(m, z) {

  return ((M + +m) / +m) * +z * ((g / L) ** 0.5);
}

function getK(m, y) {
  return (
    (m * y**2) / (b**2)
  )
}

function IthInstrumentError(m, v) {
  return (
    (v ** 2 / 0.0009) * tetam + (2 * m * v) / 0.0009 * 0.13
  )
}
