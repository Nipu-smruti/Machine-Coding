import { useEffect, useState } from 'react';
import './App.css';
import { items } from './items';
function App() {
  const filters = ['Bags', 'Sports', 'Watches', 'Sunglasses'];
  const [productList, setProductList] = useState(items);
  const [activeFilters, setActiveFilters] = useState([]);

  const handelFilterClick = (e) => {
    const category = e.target.id;
    if (activeFilters.includes(category)) {
      const filters = activeFilters.filter((el) => el !== category);
      setActiveFilters(filters);
    } else {
      setActiveFilters([...activeFilters, category]);
    }
  };

  const filteredProduct = () => {
    if (activeFilters.length > 0) {
      const tempItems =
        items.filter((item) => activeFilters.includes(item.category));
      setProductList(tempItems);
    } else {
      setProductList(items);
    }
  }

  useEffect(() => {
    filteredProduct();
  }, [activeFilters])

  return (
    <div className="App">
      <div
        onClick={handelFilterClick}
        className='filters'>
        {
          filters.map((item, idx) => (
            <button
              key={idx}
              id={item}
              className={activeFilters.includes(item) ? 'selected' : ''}
            >{item}</button>
          ))
        }
      </div>
      <div className='product-list'>
        {
          productList.map((item, idx) => (
            <div
              key={idx}
              className='item'>
              <span>{item.name}</span>
              <span className='category'>{item.category}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
