import React, { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// a proper place to define a component
const Statistics = (props) => {
  const good = props.clicks.good
  const bad = props.clicks.bad
  const neutral = props.clicks.neutral
  const sum = good + bad + neutral
  const average = sum / 3
  const positive = (good / sum * 100) + " %"

  return(
    <table>
      <tbody>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={sum} />
        <StatisticLine name="average" value={average} />
        <StatisticLine name="positive" value={positive} />
      </tbody>
    </table>  
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clicks = {
    good: good,
    bad: bad,
    neutral: neutral
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name="give feedback" />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <Header name="statistics" />
      <Statistics clicks={clicks} />
    </div>
  )
}

export default App