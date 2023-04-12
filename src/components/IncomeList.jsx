import React from 'react';
import IncomeItem from './IncomeItem';
import { MdDelete } from 'react-icons/md'

const IncomeList = ({ incomes, createDelete, createEdit, removeItems }) => {
    return (
        <>
        <ul className="list">
        {incomes.map(income => {
          return (
            <IncomeItem
              key={income.id}
              income={income}
              createDelete={createDelete}
              createEdit={createEdit}
            />
          );
        })}
      </ul>
        {incomes.length > 0 && (
                <button className="btn" onClick={removeItems}>
                    clear income
                    <MdDelete className="btn-icon" />
                </button>
            )}
        </>
    );
};
export default IncomeList