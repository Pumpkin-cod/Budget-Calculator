import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const IncomeItem = ({income, createEdit, createDelete }) => {
    const { id, money, description } = income;
    return (
        <li className='item'>
            <div className='info'>
                <span className='expense'>{description}</span>
                <span className='amount'>${money}</span>
            </div>
            <div>
                <button className='edit-btn' aria-label='edit button' onClick={() => createEdit(id)}>
                    <MdEdit />
                </button>
                <button className='clear-btn' aria-label='delete button' onClick={() => createDelete(id)}>
                    <MdDelete />
                </button>
            </div>
        </li>
    )
}

export default IncomeItem