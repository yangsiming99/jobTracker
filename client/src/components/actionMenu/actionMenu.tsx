import * as React from 'react';

import {Button, FormControl, InputGroup} from 'react-bootstrap';
import './actionMenu.css';

interface button {
  name: string,
  func: Function
}

interface ActionMenuProps {
  buttons: Array<button>,
  search: string,
  setSearch: Function,
  searchHandler: Function,
}

const ActionMenu = ({buttons, search, setSearch, searchHandler}: ActionMenuProps) => {
  return(
    <div className='actionBar'>
      <InputGroup className='searchbar'>
        <FormControl 
        placeholder='Search By Company...'
        aria-describedby='basic-addon2'
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <Button
        id='button-addon2'
        onClick={()=>searchHandler()}
        >
        Search
        </Button>
      </InputGroup>
      <div className='buttonBar'>
        {buttons.map((val, key) => 
          <Button 
          onClick={()=>val.func()} 
          key={key}>
            {val.name}
          </Button>)}
      </div>
    </div>
  )
}

export default ActionMenu;