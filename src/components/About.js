import React, {useContext} from 'react'
import detailContext from '../context/details/detailContext'

const About = () => {
  const a = useContext(detailContext)
  return (
    <div className='container'>
      about {a.name}
    </div>
  )
}

export default About
