import React from 'react';
import './input.css';

const statusList = {
    correct: 'input-correct',
    uncorrect: 'input-uncorrect'
}
const error = {
    uncorrect: 'input-uncorrect__active'
}

const Input = ({ ip, onInputChange, status }) => {
    return (
        <>
            <span className={`input-uncorrect__text ${error[status]}`}>неверный IP адрес</span>
            <input
                value={ip}
                onChange={onInputChange}
                className={`input ${statusList[status]}`}
                type='text'
                required />
            <button className="input__btn" >Check IP</button>
        </>
    );
};

export default Input;