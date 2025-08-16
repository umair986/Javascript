import { useState } from "react"
function App() {

  return (
    <div>Hi there
    <Counter />
    </div>
  )
}

function Counter (){
  const [count, setCount] = useState(0);

  function IncreaseCount(){
    setCount(count + 1);
  }

  function DecreaseCount(){
    setCount(count-1);
  }

  function resetCount(){
    setCount(0);
  }

  return (<div>
    <h1 id="test">{count}</h1> 
  <button onClick={IncreaseCount}>Counter</button>
  <button onClick={DecreaseCount}>Reduce Counter</button>
  <button onClick={resetCount}>Reset Counter</button>
   </div>)
}

export default App
