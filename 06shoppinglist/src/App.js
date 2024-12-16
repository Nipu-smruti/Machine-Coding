import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [food, setFood] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const handelInput = (e) => {
    setFood(e.target.value);
  }

  const fetchFood = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;
    const result = await fetch(url);
    const data = await result.json();
    setShoppingList(data);
  };

  useEffect(() => {
    if (food.length >= 2) {
      fetchFood(food);
    }
  }, [food]);

  const handelShoppingList = (e) => {
    const idx = e.target.getAttribute('data-id');
    const obj = {
      id: Date.now(),
      data: shoppingList[idx],
      isDone: false
    }
    const copyBucketList = [...bucketList];
    copyBucketList.push(obj);
    setBucketList(copyBucketList);
  }

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <div>
        <input
          onChange={handelInput}
          value={food}
        />
      </div>
      <div
        className='shopping-list'
        onClick={handelShoppingList}
      >
        {
          shoppingList.map((item, index) => {
            return <div
              className='product'
              data-id={index}
            >{item}</div>
          })
        }
      </div>
      <div className='bucket'></div>
    </div>
  );
}

export default App;
