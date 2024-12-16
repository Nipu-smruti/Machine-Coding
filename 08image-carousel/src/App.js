// https://www.reddit.com/r/aww/top/.json?t=all
// ▶️ ◀️
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async () => {
    setIsLoading(true);
    const url = `https://www.reddit.com/r/aww/top/.json?t=all`;
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.children;
    const list = data.filter((item) =>
      item.data.url_overridden_by_dest.includes('.jpg'))
      .map((item) => item.data.url_overridden_by_dest);
    setImages(list);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  const handelClick = (dir) => {
    const lastIdx = images.length - 1;
    if (dir === 'left') {
      if (index === 0) {
        setIndex(lastIdx);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else if (dir === 'right') {
      if (index === lastIdx) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  };

  useEffect(() => {
    const tid = setInterval(() => {
      handelClick('right');
    }, 3000);
    return () => {
      clearInterval(tid);
    }
  }, [index])

  return (
    <div className="App">
      {isLoading ?
        <div>Loading...</div>
        :
        <>
          <button
            onClick={() => handelClick('left')}
          >◀️</button>
          <img src={images[index]} alt='Not-Found' />
          <button
            className='right'
            onClick={() => handelClick('right')}
          >▶️</button>
        </>
      }

    </div>
  );
}

export default App;
