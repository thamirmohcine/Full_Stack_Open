const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <>
      <p>
        {parts[0].part} {parts[0].exercises}
      </p>
      <p>
        {parts[1].part} {parts[1].exercises}
      </p>
      <p>
        {parts[2].part} {parts[2].exercises}
      </p>
    </>
  )
}

const Total = ({exercises}) => {
  return (
    <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    part : 'Fundamentals of React',
    exercises : 10
  }
  const part2 = {
    part : 'Using props to pass data',
    exercises : 7
  }
  const part3 = {
    part : 'State of a component',
    exercises : 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1,part2,part3]} />
      <Total  exercises={[part1.exercises, part2.exercises, part3.exercises]}/>
      
    </div>
  )
}

export default App