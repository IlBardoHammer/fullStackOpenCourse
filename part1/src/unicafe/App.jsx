import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Display = ({good, neutral, bad}) => {
  return (
    <div>
      <h4>good {good}</h4>
      <h4>neutral {neutral}</h4>
      <h4>bad {bad}</h4>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => {
    const updateClick = good + 1;
    setGood(updateClick);
  }

  const onNeutralClick = () => {
    const updateClick = neutral + 1;
    setNeutral(updateClick);
  }

  const onBadClick = () => {
    const updateClick = bad + 1;
    setBad(updateClick);
  }

  return (
    <div>
      <h2>give feedbacks</h2>
      <Button text="good" handleClick={onGoodClick}/>
      <Button text="neutral" handleClick={onNeutralClick}/>
      <Button text="bad" handleClick={onBadClick}/>
      <h2>statistics</h2>
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App