import React from 'react'

const Header = ({name}) => {
    return <h2>{name}</h2>
}

const Content = ({parts}) => {
    return (
    <div>
        {parts.map(part => 
        <Part key={part.id}
            name={part.name}
            exercises={part.exercises}/>
        )}
    </div>
    )
}

const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}
  
const Total = ({parts}) => 
    <h3>total of {parts.reduce((s, p) => s + p.exercises, 0)}
     exercises</h3>

const Course = ({courses}) => {
    return (
        <div>
            {courses.map(course => 
            <>
                <Header name={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </>
            )}
        </div>
    )
}

export default Course