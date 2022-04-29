import './App.css'
import { useState } from 'react'
import { numberProcessing } from "./apis/NumberProcessing"
function App() {
  //input value
  const [value, setValue] = useState('1,3,4,5,6,7,12,15,56,78,99,79,24,11,68,75')
  //mode input|reset
  const [isInputMode, setInputMode] = useState(true)
  //error messages
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  //result
  const [result, setResult] = useState<number[]>([])
  // handle input change
  const handleInputChange = (event: any) => {
    setValue(event.target.value)
  }
  //click button
  const handleClick = async () => {
    //case input
    if (isInputMode) {
      //check validation
      if (validation(value)) {
        try {
          //call api
          let response = await numberProcessing({ input: value })
          //set result
          setResult(response.data.data)
          //change mode
          setInputMode(!isInputMode)
        }
        catch (err: any) {
          //set message errors
          if (err.response.data.errors?.length) {
            setErrorMessages(err.response.data.errors)
          }
        }
      }
    }
    //case reset
    else {
      setInputMode(!isInputMode)
    }
  }
  //check validation
  const validation = (input: string) => {
    let errorMessages = []
    //check null|empty
    if (!input.length) errorMessages.push('Input is Required')
    //check regex
    let arrayRegex = /[0-9]+(,[0-9]+)*$/g
    if (!arrayRegex.test(input)) errorMessages.push('Value not match array format')
    setErrorMessages(errorMessages)
    return !errorMessages.length
  }
  // render view
  return (
    <div className='App'>
      <div className='container'>
        <div className='form'>
          {/* input item */}
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
          {/* result */}
          {!isInputMode && (
            <div className='form-item'>
              <label className='label'>Result</label>
              <div className="result">{result.join('-')}</div>
            </div>
          )}
          {/* button submit|reset */}
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
