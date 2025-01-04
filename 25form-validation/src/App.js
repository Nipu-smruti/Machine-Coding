import './App.css';
import { useState } from 'react';

function App() {
  const defaultValues = {
    firstName: {
      id: 'firstName',
      label: 'FirstName',
      type: 'text',
      placeholder: 'FirstName',
      value: '',
      isError: false,
      errorMsg: "FirstName can't be empty"
    },
    lastName: {
      id: 'lastName',
      label: 'LastName',
      type: 'text',
      placeholder: 'LastName',
      value: '',
      isError: false,
      errorMsg: "LastName can't be empty"
    },
    email: {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      value: '',
      isError: false,
      errorMsg: "Email can't be empty"
    },
    password: {
      id: 'password',
      label: 'Password',
      type: 'text',
      placeholder: 'Password',
      value: '',
      isError: false,
      errorMsg: "Password can't be empty"
    },
    confirmPassword: {
      id: 'confirmPassword',
      label: 'ConfirmPassword',
      type: 'text',
      placeholder: 'ConfirmPassword',
      value: '',
      isError: false,
      errorMsg: "ConfirmPassword can't be empty"
    }
  };

  const [formData, setFormData] = useState(defaultValues);
  const [passMatch, setPassMatch] = useState(true);

  const handelInputChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const copyFormData = { ...formData };
    copyFormData[key].value = value;
    setFormData(copyFormData);
    isValidForm();
  };

  const passwordMatch = () => {
    const copyFormData = { ...formData };
    const pass = copyFormData['password'].value;
    const cPass = copyFormData['confirmPassword'].value;
    if (pass !== cPass) {
      setPassMatch(false);
    } else {
      setPassMatch(true);
    }
  }

  const isValidForm = () => {
    const copyFormData = { ...formData };
    Object.keys(copyFormData).forEach(key => {
      const obj = copyFormData[key];
      obj.isError = !obj.value ? true : false;
      passwordMatch();
    });
    setFormData(copyFormData);
  }

  const handelFormSubmit = (e) => {
    e.preventDefault();
    isValidForm();
  }

  console.log(formData);


  return (
    <div className="App">
      <div className='container'>
        <form
          onSubmit={handelFormSubmit}
        >
          {
            Object.keys(formData).map((key) => {
              const { id, label, type, placeholder,
                value, isError, errorMsg
              } = formData[key];
              return <div key={id} className='form-data'>
                <label>{label}</label>
                <input
                  id={id}
                  type={type}
                  value={value}
                  placeholder={placeholder}
                  onChange={handelInputChange}
                  className={
                    isError ? 'error-border' : ''
                  }
                />
                {
                  isError &&
                  <span className='error'>{errorMsg}</span>
                }
                {
                  key === 'confirmPassword' && !passMatch &&
                  <span className='error'>Password does not match</span>
                }
              </div>
            })
          }
          <div className='form-data'>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default App;
