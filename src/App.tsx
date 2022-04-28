import './App.css'
import React, { useState, useEffect } from 'react'
import {numberProcessing} from "./apis/NumberProcessing"
function App() {
  const [value, setValue] = useState('abc')
  const [isInputMode, setInputMode] = useState(true)
  const [errorMessages, setErrorMessages]= useState([''])
  // handle input change
  const handleInputChange = (event:any) => {
    setValue(event.target.value)
  }
  const handleClick = () => {
    setInputMode(!isInputMode)
    validation(value)
    numberProcessing()
  }
  useEffect(() => {
    console.log(errorMessages)
  }, [errorMessages]) // Only re-subscribe if props.friend.id changes

  const validation = (input:string) => {
    if (!input.length) setErrorMessages(['Input is Required'])
    let arrayRegex = /[0-9]+(,[0-9]+)*$/g
    if (!arrayRegex.test(input)) setErrorMessages(['Regex error'])
    else setErrorMessages([])
  }
  // render view
  return (
    <div className='App'>
      <div className='container'>
        <div className='form'>
          <div className='form-item'>
            <label className='label'>Text</label>
            <div className='input-content'>
              <input
                type='text'
                placeholder='Please input follow format nunber1,number2,...'
                className={
                  errorMessages?.length > 0 ? 'input had-error' : 'input'
                }
                value={value}
                onChange={handleInputChange}
              />
            </div>
            {/* show first message */}
            {errorMessages?.length > 0 && (
              <span className='text-danger'>{errorMessages[0]}</span>
            )}
          </div>
          {!isInputMode && (
            <div className='form-item'>
              <label className='label'>Result</label>
              <div>{'result'}</div>
            </div>
          )}
          <button
            onClick={handleClick}
            type='button'
            className='btn-submit mt-1'
          >
            {isInputMode ? 'Submit' : 'Reset'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
