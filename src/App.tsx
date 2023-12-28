import React from 'react';
import logo from './logo.svg';
import './App.css';

interface ITest {
  sayi:number
}
function Test(props:ITest) {
  const{sayi}=props
  return (
    <p>
   {sayi}
  </p>
  );
}

function App() {
  return (
    <div className="App">
     <Test sayi={5}/>
    </div>
  );
}

export default App;
