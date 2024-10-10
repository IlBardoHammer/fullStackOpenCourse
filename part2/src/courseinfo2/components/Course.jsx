const Header = ({ name }) => <h1>{ name }</h1>

const Part = ({ name, exercise }) => <p>{ name } { exercise }</p>

const Content = ({ partsOfCourse }) => {
  return (
    <div>
      { partsOfCourse.map(part => <Part key={ part.id } name={ part.name } exercise={ part.exercises }/>) }
    </div>
  )
}
const Total = ({ partsOfCourse }) => {
  const total = partsOfCourse.reduce((accumulator, current) => accumulator + current.exercises, 0)
  return <h4>Number of exercises { total }</h4>
}

const Course = ({ courses }) => {

  return (
    <div>
      { courses.map(course => (
        <div key={ course.id }>
          <Header name={ course.name }/>
          <Content partsOfCourse={ course.parts }/>
          <Total partsOfCourse={ course.parts }/>
        </div>
      ))}
    </div>
  )
}

export default Course;