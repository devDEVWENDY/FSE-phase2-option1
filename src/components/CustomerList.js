import React from 'react';


function CustomerList(props) {
console.log(`PROPS ${props.customers}`)

// tranferred the whole customers
    return(
        <div className='customers'>
            <h1>DIRECTORY</h1>

            <div className="boxed" >
                <h4>Customer List</h4>
                <table id="customer-list">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Pass</th>
                    </tr>
                </thead>
                <tbody>
                    {/* below: maps over customers to create each row for a single customer item name, email, password */}

                    {props.customers.map(
                    (item, index) => {
                        {/* className: checks customer id matches form id to set className to selected for this customer item */}

                        return (<tr key={item.id} 
                        className={ (item.id === props.formObject.id )?'selected': ''}
                        onClick={()=>props.handleListClick(item)} 
                        >
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        </tr>);
                    }
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );

}

export default CustomerList;