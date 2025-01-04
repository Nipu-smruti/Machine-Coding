// https://hacker-news.firebaseio.com/v0/jobstories.json;
// https://hacker-news.firebaseio.com/v0/item/29992568.json;
// \((YC[^)]+)\)
import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [postIds, setPostIds] = useState([]);
  const [postMetaData, setPostMetaData] = useState([]);

  const getData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const getJobTitel = (text) => {
    const data = text.split(/\((YC[^)]+)\)/);
    const part1 = data[0];
    const part2 = data[1];
    return `${part1} ${part2}`
  }
  const getJobInfo = (text) => {
    const data = text.split(/\((YC[^)]+)\)/);
    if (data.length > 2) {
      const part3 = data[2];
      return `${part3}`
    }
  }

  const getUpdatedDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const updatedDate = `${day}/${month}/${year}`;
    return updatedDate;
  }

  const fetchPostIds = async () => {
    const url = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
    const data = await getData(url);
    const ids = data.splice(0, 9);
    setPostIds(data);
    fetchPostMetaData(ids);
  }

  const fetchPostMetaData = async (ids) => {
    const apiCalls = ids.map((id) => {
      const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
      return getData(url);
    });
    const results = await Promise.all(apiCalls);
    if (results.length) {
      const newArr = results.map((item) => {
        const obj = {
          jobTitle: getJobTitel(item.title),
          jobInfo: getJobInfo(item.title),
          date: getUpdatedDate(item.time),
          url: item.url ? item.url : `https://news.ycombinator.com/item?id=${item.id}`
        }
        return obj;
      });
      let copyPostMetaData = [...postMetaData];
      copyPostMetaData = [...copyPostMetaData, ...newArr];
      setPostMetaData(copyPostMetaData);
    }
  }

  useEffect(() => {
    fetchPostIds();
  }, []);

  const handelLoadMore = () => {
    const copyIds = [...postIds];
    if (copyIds.length > 0) {
      const ids = copyIds.splice(0, 6);
      fetchPostMetaData(ids);
      setPostIds(copyIds);
    }
  }

  return (
    <div className="App">
      <h1>Job Board</h1>
      <div className='cards'>
        {
          postMetaData?.length === 0 ?
            <div>Loading...</div> :
            postMetaData.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target='_blank'
                className='card'>
                <div className='company-info'>{post.jobTitle}</div>
                <div className='job-info'>{post.jobInfo}</div>
                <div className='date'>{post.date}</div>
              </a>
            ))
        }
      </div>
      <button onClick={handelLoadMore}>Load More</button>
    </div>
  );
}

export default App;
