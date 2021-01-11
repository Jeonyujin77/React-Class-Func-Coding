import React from 'react';
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

// Hook을 이용하여 function style code에서도 state 사용이 가능해짐
function FuncComp(props) {
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {props.initNumber}</p>
    </div>
  );
}

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber
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
    </div>
    )
  }
}
export default App;
