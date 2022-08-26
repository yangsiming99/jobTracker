import React, {useState} from 'react';
import {Form, FormGroup, Button, Spinner } from 'react-bootstrap';
import {addJob} from '../../helpers/fetch'
import "./popupAdd.css";

interface popupAddProps{
  cancelHandler: Function,
  alertHandler: Function,
}

const PopupAdd = ({cancelHandler, alertHandler}: popupAddProps) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(!loading)
    let result : any = await addJob(inputValue)
    if(!result.error){
      console.log('it worked')
      alertHandler({type: "success", message: "Job has been successfully added"})
    }
    else {
      console.log("it didn't work")
      alertHandler({type: "danger", message: result.error})
    }
    cancelHandler();
  }

  return (
    <Form>
      <h1>Add a Job</h1>
      <FormGroup>
        <Form.Label>URL Link</Form.Label>
        <Form.Control 
        value={inputValue} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder='Enter URL Link To Job' 
        disabled={loading ? true : false}
        />
        <div className="popupButtonsDiv" style={{display: loading ? 'none' : 'block'}}>
          <Button 
          variant='secondary' 
          onClick={()=>cancelHandler()} 
          className='popupButton'>
            Cancel
          </Button>
          <Button
          onClick={()=>handleAdd()}
          className='popupButton'>
            Add
          </Button>
        </div>
        {!loading ? <></> :
          <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
      </FormGroup>
    </Form>
  )
}

export default PopupAdd;