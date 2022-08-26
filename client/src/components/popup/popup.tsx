import react, {ReactNode} from 'react';
import './popup.css';

interface popupProps{
  children: ReactNode,
}

const Popup = (props: popupProps) => {

  return (
    <div className='popupbg'>
      <div className='popup'>
        {props.children}
      </div>
    </div>)
}

export default Popup;