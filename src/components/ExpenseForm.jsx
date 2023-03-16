import React from 'react'
import {MdSend} from 'react-icons/md'
const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">Item</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder=" "
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder=""
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn1">
        {edit ? "edit" : "submit"}
        {/* submit  */}
        <MdSend className="btn1-icon" />
      </button>
    </form>
  );
};


export default ExpenseForm
