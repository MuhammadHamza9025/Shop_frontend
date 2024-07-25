import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {

    const users = useSelector(state => state.customreducer.users)
    return (
        <div>
            {users.UserName} hi
        </div>
    )
}

export default About
