import React, { useState } from 'react';

function Square() {

const [value, setvalue] = useState(null);

function handelClick(){
  setvalue('x');
}

  return <button className="square" onClick={handelClick}>{value}</button>;
}

export default Square;