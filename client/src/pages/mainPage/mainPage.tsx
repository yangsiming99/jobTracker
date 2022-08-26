import React, {useEffect, useState} from 'react';
import Layout from '../../layout/layout';
import ActionMenu from '../../components/actionMenu/actionMenu';
import TableDisplay from '../../components/table/table';
import Popup from '../../components/popup/popup';
import PopupAdd from '../../components/popupAdd/popupAdd';
import PopupDelete from '../../components/popupDelete/popupDelete';
import AlertMsg from '../../components/alertMsg/alertMsg';

import {searchJob} from '../../helpers/fetch';

import './mainPage.css';

const MainPage = () => {
  const [jobData, setJobData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(<></>)
  const [alert, setAlert] = useState({type: "", message: ""})
  const [search, setSearch] = useState("");

  const addHandler = () => {
    const cancel = () => {
      setPopupContent(<></>)
      setPopup(false)
    }
    setPopupContent(<PopupAdd 
      cancelHandler={()=>cancel()}
      alertHandler={setAlert}
      />)
    setPopup(!popup)
  }

  const deleteHandler = (id: string, position: string, company: string) => {
    const cancel = () => {
      setPopupContent(<></>)
      setPopup(false)
    }
    setPopupContent(<PopupDelete 
      id={id}
      position={position}
      company={company}
      cancelHandler={()=>cancel()}
      alertHandler={setAlert}
    />)
    setPopup(!popup)
  }

  const searchHandler = async () => {
    let results : any = await searchJob(search);
    console.log(results)
    setJobData(results.data)
  }

  const tableHeaders = ["ID", "Company", "Position", "Link", "Job Site", "Date Applied", "Actions"]
  const actionButtons = [
    {name: "Add", func: addHandler},
  ]

  useEffect(() => {
    if(!popup){
      fetch('http://localhost:8080/jobs/')
      .then(res => res.json())
      .then(resp => setJobData(resp.data))
    }
  }, [popup])
  
  return (
    <Layout>
      {/* {popup ? <Popup>{popupContent}</Popup> : <></>} */}
      {popup ? <Popup>{popupContent}</Popup> : <></>}
      <ActionMenu 
      buttons={actionButtons}
      search={search}
      setSearch={setSearch}
      searchHandler={searchHandler}
      />
      <div className='tablediv'>
        <TableDisplay 
          headers={tableHeaders}
          data={jobData}
          deleteHandler={deleteHandler}
        />
      </div>
      {alert.type && alert.message ? <AlertMsg setAlert={setAlert} type={alert.type} message={alert.message} /> : <></>}
    </Layout>
  )
}

export default MainPage;