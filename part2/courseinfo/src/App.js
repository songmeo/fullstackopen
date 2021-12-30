import React from 'react'

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return <Course courses={courses} />
}

export default App