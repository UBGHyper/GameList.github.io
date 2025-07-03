import React from 'react'
import backSVG from './Assets/B.svg'
import "./MenuHeader.css"
import { Link } from 'react-router-dom'

export const MenuHeader = ({ children }) => {
    return (
        <div className='BankComponentsHeader'>
            <div className='BankComponentsHeaderBackButton'>
                <Link to='/'>
                    <img src={backSVG} alt='Bank of America' />
                </Link>
            </div>
            <h1>{children}</h1>
        </div>
    )
}
