import {useState} from "react";

const StatisticLine = (props) => {

  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = (good + neutral + bad) === 0 ? 0 :good + neutral + bad;
  const average_ = total === 0 ? 0 : (good - bad) / total
  const positive_ = total === 0 ? 0 : (good / total) * 100

  if (!good && !bad && !neutral)
      return (
    <>
        <h1>statistics</h1>
        <div>No feedback given</div>
    </>
      )

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>

        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average"  value={average_} />
        <StatisticLine text="positive"  value={positive_ + " %"} />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} /> 

    </div>
  )
}
export default App;