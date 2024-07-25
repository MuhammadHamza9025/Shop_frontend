import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
    const users = useSelector(state => state.customreducer.users)
    return (
        <div >
            Footer {users?.UserName}

        </div>
    )
}

export default Footer
