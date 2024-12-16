import { useState } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  const handelOffer = () => {
    setIsShow(true);
  }

  const handelAcceptOffer = () => {
    setIsShow(false);
    setIsOfferAccepted(true);
  }

  const handelClose = () => {
    setIsShow(false);
  }

  return (
    <div>
      <div className='show-offer'>
        {
          !isOfferAccepted && <button
            className='offer-btn'
            onClick={handelOffer}
          >
            Show Offer
          </button>
        }
        {
          isOfferAccepted && <div style={{ fontSize: 50 }}>
            Offer Accepted
          </div>
        }
      </div>
      {
        isShow &&
        <Modal
          handelClose={handelClose}
          handelAcceptOffer={handelAcceptOffer}
        />
      }
    </div >
  );
}

export default App;
