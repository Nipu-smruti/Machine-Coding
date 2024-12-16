import { useState } from 'react';
import './App.css';

function App() {
  const data = [
    {
      id: 'name',
      label: 'Name',
      inputType: 'text',
      buttonName: 'Next',
      placeholder: 'Your Name...'
    },
    {
      id: 'email',
      label: 'Email',
      inputType: 'email',
      buttonName: 'Next',
      placeholder: 'Your Email...'
    },
    {
      id: 'dob',
      label: 'DOB',
      inputType: 'date',
      buttonName: 'Next',
      placeholder: ''
    },
    {
      id: 'password',
      label: 'Password',
      inputType: 'password',
      buttonName: 'Submit',
      placeholder: 'Your Password...'
    },
  ];

  const [forms, setForms] = useState(data);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    password: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (index === forms.length - 1) {
      setIsFormSubmitted(true);
      alert(JSON.stringify(formData))
    } else {
      setIndex((idx) => idx + 1);
    }
  }

  const handelInputChange = (e) => {
    const val = e.target.value;
    const id = e.target.id;
    const copyFormData = { ...formData };
    copyFormData[id] = val;
    setFormData(copyFormData);
  }

  const handelBack = (e) => {
    e.preventDefault();
    setIndex((idx) => idx - 1);
  }

  return (
    <div className='App'>
      {!isFormSubmitted ? <form
        className='container'
        onSubmit={handelSubmit}
      >
        {
          index > 0 && <a
            href='/'
            onClick={handelBack}
          >Back</a>
        }
        <label>{forms[index].label}</label>
        <input
          required
          id={forms[index].id}
          type={forms[index].inputType}
          value={formData[forms[index].id]}
          placeholder={forms[index].placeholder}
          onChange={handelInputChange}
        />
        <button>{forms[index].buttonName}</button>
      </form> :
        <div>
          <h1>Success!</h1>
          <hr />
          <span>Name: {formData.name}</span>
          <br />
          <span>Email: {formData.email}</span>
          <br />
          <span>DOB: {formData.dob}</span>
          <br />
          <span>Password: {formData.password}</span>
          <br />
        </div>
      }
    </div>
  );
}

export default App;
