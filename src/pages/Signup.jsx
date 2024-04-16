//here we're just rendering the Signup component that we have built in components.
import React from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
    return (
        <div className='py-8'>
            <SignupComponent />
        </div>
    )
}

export default Signup