import React from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { getCoverLetter } from '../../helpers/fetch';
import './table.css';

interface TableProps {
  headers: Array<String>
  data: Array<any>,
  deleteHandler: Function,
}

const TableDisplay = (props: TableProps) => {

  // const date = new Date;

  const coverletterHandler = async (job_id: string) => {
    let test :any = await getCoverLetter(job_id)
    console.log(test.test)
    navigator.clipboard.writeText(test.test)
  }

  return(
    <Table className='mainTable' striped bordered hover variant="dark" size="sm">
      <thead>
        <tr>
          {props.headers.map((val, key) => <th key={key}>{val}</th>)}
        </tr>
      </thead>
      <tbody>
          {props.data.map((val, key) => (<tr key={key}>
            <td>{val.job_id}</td>
            <td>{val.company}</td>
            <td>{val.position}</td>
            <td><Button onClick={()=>window.open(val.link, '_blank', 'noopener,noreferrer')}>Go to Posting</Button></td>
            <td>{val.job_site}</td>
            <td>{new Date(val.date_applied).toLocaleDateString('en-gb')}</td>
            <td><ButtonGroup>
              <Button onClick={()=>props.deleteHandler(val.job_id, val.position, val.company)}>Delete</Button>
              <Button onClick={()=>coverletterHandler(val.job_id)}>CoverLetter</Button>
              </ButtonGroup></td>
          </tr>))}
      </tbody>
    </Table>
  )
}

export default TableDisplay;