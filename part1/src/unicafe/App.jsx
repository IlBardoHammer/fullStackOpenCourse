import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={ handleClick }>{ text }</button>

const StatisticsLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
      <tr>
        <td>{ text }</td>
        <td>{ value }</td>
      </tr>
      </tbody>
    </table>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = ( good - bad / all )
  const positivePercentage = ( good / all ) * 100;

  return (
    <div>
      { all === 0 ? (
        <h4>No feedback given</h4>
      ) : (
        <div>
          <StatisticsLine text="good" value={ good }/>
          <StatisticsLine text="neutral" value={ neutral }/>
          <StatisticsLine text="bad" value={ bad }/>
          <StatisticsLine text="all" value={ all }/>
          <StatisticsLine text="average" value={ average }/>
          <StatisticsLine text="positive" value={ positivePercentage.toFixed(2) + '%' }/>
        </div>
      ) }
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

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
      <Button text="good" handleClick={ onGoodClick }/>
      <Button text="neutral" handleClick={ onNeutralClick }/>
      <Button text="bad" handleClick={ onBadClick }/>
      <h2>statistics</h2>
      <Statistics good={ good } neutral={ neutral } bad={ bad }/>
    </div>
  )
}

export default App