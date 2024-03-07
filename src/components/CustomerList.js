import React from 'react';


function CustomerList(props) {
    console.log(`CustomerList props ${props.customers}`);
    return(
        <div className='customers'>
            <h1>THIS IS CUSTOMER LIST</h1>

            {customers.map(
                (item, index) => {
                {/* className: checks customer id matches form id to set className to selected for this customer item */}

                return (<tr key={item.id} 
                    className={ (item.id === formObject.id )?'selected': ''}
                    onClick={()=>handleListClick(item)} 
                >
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                </tr>);
                }
            )}
          
            
        </div>
    );
}

export default CustomerList;