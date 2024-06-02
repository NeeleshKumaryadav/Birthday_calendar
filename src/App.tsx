import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calander from './component/Calander';
import { MyProvider } from './component/Context';

function App() {
  return (
    <div className="br-blue-500">
      <h1 className='text-5xl text-center bg-green-500 h-16'>BirthDay Calendar</h1>
      <MyProvider>
        <Calander />
      </MyProvider>
      </div>
  );
}

export default App;
