import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div className='home-container'>
            <Link id="order-pizza" to='/pizza'>Pizza?</Link>
        </div>
    )
}