
const Part = ({obj}) => {
  return (
    <p>{obj.name} {obj.exercises}</p>
  )
}

const Course = ({course}) => {
  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((part) => <Part key={part.id} obj={part} />)}
      <h3>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h3>
    </>
  )
}

export default Course;