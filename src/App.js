// import React from 'react';
// import customers from './memdb.js'
import { getAll, post, put, deleteById } from './memdb.js';
import CustomerList from './components/CustomerList.js';
import './App.css';
import React, {useState, useEffect} from 'react';
import AddUpdateForm from './components/AddUpdateForm.js';

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);   // customers state keeper created
                                                    // useEffect uses it (through getCustomers) to load empty array w/customers for display when app started
                                                    // this is how dynamic data is 1st put on a page, useEffect not needed for static displays

 // let formObject = customers[0];
  const [formObject, setFormObject] = useState(blankCustomer);  // formObject started as (empty) blank customer

  let mode = (formObject.id >= 0) ? 'Update' : 'Add';   // MODE ternary to set form for UPDATE when customer index exists & ADD when -1 blank customer exists
  useEffect(() => { getCustomers() }, []);    // 1x action gets list of all customers for display when app started

  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll());
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    console.log("FORM", formObject.id);
    console.log("ITEM", item.id);
    if(formObject.id == item.id) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    if(formObject.id >= 0) {
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    if (mode === 'Add') {       // creates new customer & adds to customer array
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  }

  return (
    <div>

      <div> <CustomerList customers={customers} formObject={formObject} handleListClick={handleListClick} /></div>
      
      <div> <AddUpdateForm
                mode={mode}
                handleInputChange={handleInputChange}
                formObject={formObject} 
                onDeleteClick={onDeleteClick}
                onSaveClick={onSaveClick}
                onCancelClick={onCancelClick}
            />
      </div>

      {/*  
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <form >
          <table id="customer-add-update" >
            <tbody>
              <tr>
                <td className={'label'} >Name:</td>
                <td><input
                  type="text"
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                  value={formObject.name}
                  placeholder="Customer Name"
                  required /></td>
              </tr>
              <tr>
                <td className={'label'} >Email:</td>
                <td><input
                  type="email"
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                  value={formObject.email}
                  placeholder="name@company.com" /></td>
              </tr>
              <tr>
                <td className={'label'} >Pass:</td>
                <td><input
                  type="text"
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                  value={formObject.password}
                  placeholder="password" /></td>
              </tr>
              <tr className="button-bar">
                <td colSpan="2">
                  <input type="button" value="Delete" onClick={onDeleteClick} />
                  <input type="button" value="Save" onClick={onSaveClick} />
                  <input type="button" value="Cancel" onClick={onCancelClick} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
       */}
    </div>
  );
}

export default App;
