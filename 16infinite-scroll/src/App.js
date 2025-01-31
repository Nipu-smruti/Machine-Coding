// https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9;
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const loderRef = useRef();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (index) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9`;
      const result = await fetch(url);
      const data = await result.json();
      return data;
    } catch (err) {
      console.log('ERROR');
    }
  };

  const getData = useCallback(async () => {
    if (loading)
      return
    setLoading(true);
    const data = await fetchImages(page);
    setImages((prevImages) => [...prevImages, ...data]);
    setTimeout(() => {
      setLoading(false);
    }, 3000)
    setPage((prevPage) => prevPage + 1);
  }, [page, loading])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // 
        getData();
      }
    })

    if (loderRef.current) {
      observer.observe(loderRef.current);
    }
    return () => {
      if (loderRef.current) {
        observer.unobserve(loderRef.current);
      }
    }
  }, [getData])

  const fetchFirstPage = async () => {
    const data = await fetchImages(1);
    setImages(data);
  };

  console.log(images);

  useEffect(() => {
    fetchFirstPage();
  }, []);

  return (
    <div className="App">
      <h1>Infinite Scrolling</h1>
      {
        images?.map((image, index) => (
          <img
            key={index}
            alt={image.title}
            src={image.thumbnailUrl}
          />
        ))
      }
      <div ref={loderRef}>
        {
          loading && <h1>Loading</h1>
        }
      </div>
    </div>
  );
}

export default App;
