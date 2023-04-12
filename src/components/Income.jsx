import React, { useState } from 'react';
import {MdSend} from 'react-icons/md';

const Income = ({money, description, handleIncomeChange, handleDescriptionChange, handleAddIncome, alter}) => {

    return (
        <div>
        <form onSubmit={handleAddIncome}>
            <h2 className='heading'>Add Income</h2>
            <div className='form-center'>

            <div className='form-group'>
                <label htmlFor="income">Income: </label>
                <input className='form-control' type="number" id="income" value={money} onChange={handleIncomeChange} />
            </div>
            <div className='form-group'>
                <label htmlFor="description">Description: </label>
                <input className='form-control' type="text" id="description" value={description} onChange={handleDescriptionChange} />
            </div>
            </div>
            <button className='btn1'>
                    {alter ? "Edit" : "Add Income"}
            <MdSend className="btn1-icon" />
            </button>
        </form>
        </div>
    );
};

export default Income;
