import React, { useState, useEffect } from 'react';

const InputForm = ({ value, inputRef, onSubmitData, inputPlaceholder }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gọi hàm submit dữ liệu
    await onSubmitData(inputValue);

    // Reset giá trị input sau khi submit
    setInputValue('');
  };

  return (
    <form className='text-center' onSubmit={handleSubmit}>
      <input
        type="text"
        className=''
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        placeholder={inputPlaceholder}
        style={{
          width: "80%",
          padding: "4px",
          margin: "4px",
        }}
      />
      <div className="btn-box">
        <button
          type="submit"
          className='submit-btn'
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default InputForm;