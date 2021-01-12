import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="remove func" onClick={function() {
        setFuncShow(false);
      }}/>
      <input type="button" value="remove class" onClick={function() {
        setClassShow(false);
      }}/>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}


var funcStyle = 'color: green';
var funcId = 0;
function FuncComp(props) {
  var numberState = useState(props.initNumber); // Hook을 이용하여 function style code에서도 state 사용이 가능해짐
  var number = numberState[0]; // 상태 값
  var setNumber = numberState[1]; // 상태를 변경할 수 있는 함수

  // var dateState = useState((new Date()).toString());
  // var date = dateState[0];
  // var setDate = dateState[1];
  var [date, setDate] = useState((new Date()).toString()); // useState 축약형
 
  // side effect
  useEffect(function() {
    console.log('%cFunc useEffect number (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle); 
    document.title = number;

    //clean up(정리정돈: 초기화 후 정리)
    return function() {
      console.log('%cFunc useEffect number return (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle); 
    }
  }, [number]) // useEffect는 중복 사용이 가능함

  useEffect(function() {
    console.log('%cFunc useEffect date (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle); 
    document.title = date;

    return function() {
      console.log('%cFunc useEffect date return (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle); 
    }
  }, [date]) 

  // 1회만 실행(mount)
  useEffect(function() {
    console.log('%cFunc useEffect (componentDidMount)-only once ' + (++funcId), funcStyle); 
    document.title = date;

    return function() {
      console.log('%cFunc useEffect return (componentDidMount)-only once ' + (++funcId), funcStyle); 
    }
  }, []) 

  console.log('%cFunc => render ' + (++funcId), funcStyle); 

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



var classStyle = 'color: red';
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }

  // Life Cycle
  componentWillMount() {
  // 현재 사용하지 않는 것을 권장하고 있음.(deprecated)
    console.log('%cClass => componentWillMount', classStyle); // 렌더링 전호출
  }

  componentDidMount() {
    console.log('%cClass => componentDidMount', classStyle); // 렌더링 후 호출
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cClass => shouldComponentUpdate', classStyle); // 렌더링 여부 판단
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    // 현재 사용하지 않는 것을 권장하고 있음.(deprecated)
    console.log('%cClass => componentWillUpdate', classStyle); // 컴포넌트의 상태 변경 시 재렌더링 전 호출
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('%cClass => componentDidUpdate', classStyle); // 컴포넌트의 상태 변경 시 재렌더링 후 호출
  }

  componentWillUnmount() {
    console.log('%cClass => componentWillUnmount', classStyle);
  }

  render() {
    console.log('%cClass => render', classStyle);
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
