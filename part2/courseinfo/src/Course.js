const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.num} {props.name}
      </p>
    )
  } 
  
  const Content = (props) => {
    const parts = props.parts
    return (
      <div>
        {parts.map(part => 
          <Part num={part.name} name={part.exercises} key={part.id} />
        )}
      </div>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <p> Number of exercises {total} </p>
    )
  }
  
  const Course = (props) => {
    const courses = props.courses
    return (
      <div>
        {courses.map(course =>
          <div key={course.id} >
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )}
      </div>
    )
  }

export default Course