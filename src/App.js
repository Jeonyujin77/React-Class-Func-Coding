import React, {useState} from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}


function FuncComp(props) {
  var numberState = useState(props.initNumber); // Hook을 이용하여 function style code에서도 state 사용이 가능해짐
  var number = numberState[0]; // 상태 값
  var setNumber = numberState[1]; // 상태를 변경할 수 있는 함수

  // var dateState = useState((new Date()).toString());
  // var date = dateState[0];
  // var setDate = dateState[1];
  var [date, setDate] = useState((new Date()).toString()); // useState 축약형

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {number}</p>
      <input type="button" value="random" onClick={
        function() {
          setNumber(Math.random());
        }
      }/>
      <p>Date: {date}</p>
      <input type="button" value="date" onClick={
        function() {
          setDate((new Date()).toString());
        }.bind(this)
      }/>
    </div>
  );
}

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }
  render() {
    return (
    <div className="container">
      <h2>class style component</h2>
      <p>Number: {this.state.number}</p>
      <input type="button" value="random" onClick={
        function() {
          this.setState({number: Math.random()});
        }.bind(this)
      }/>
      <p>Date: {this.state.date}</p>
      <input type="button" value="date" onClick={
        function() {
          this.setState({date: (new Date()).toString()});
        }.bind(this)
      }/>
    </div>
    )
  }
}
export default App;
