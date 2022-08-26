import React, { useState } from 'react';
import { Form, FormGroup, Button, Spinner } from 'react-bootstrap';
import {deleteJob} from '../../helpers/fetch'

interface PopupDelete {
  id: string,
  position: string,
  company: string,
  cancelHandler: Function,
  alertHandler: Function,
}

const PopupDelete = (
{
  id, 
  position, 
  company, 
  cancelHandler, 
  alertHandler
}: PopupDelete) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(!loading)
    let result : any = await deleteJob(id)
    if(!result.error){
      alertHandler({type: "success", message: `${position} at ${company} has been deleted`});
    }
    else {
      alertHandler({type: "danger", message: result.error});
    }
    cancelHandler();
  }

  return (
    <Form>
      <h1>Delete Job</h1>
      <FormGroup>
        <h5>Are you sure you want to delete the following:</h5>
        <h5><b>{position}</b> at <b>{company}</b>?</h5>
        <div className="popupButtonsDiv" style={{display: loading ? 'none' : 'block'}}> 
          <Button 
          variant='secondary' 
          onClick={()=>cancelHandler()} 
          className='popupButton'>
            Cancel
          </Button>
          <Button 
          variant='danger' 
          onClick={()=>handleDelete()}
          className='popupButton'>
            Delete
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

export default PopupDelete;