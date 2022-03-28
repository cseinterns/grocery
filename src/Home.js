import { logDOM } from '@testing-library/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';

const Home = () => {

    const [orderList,setOrderList] = useState([]);
    const [buyerOrder,setbuyerOrder] = useState('');
    const [searchProduct,setProduct] = useState('');
    const [searchId,setID] = useState('');
   // const [newOrderList,setNewList] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000").then((response)=>{
            
            var list2 =  response.data.map(
                    (d) => (
                        {...d, select:false })
                    
                    );
                    
                   setOrderList(list2);
        
            });
    },[]);
    

//for delete items from state and delete api
    const deleteId =() =>{
        let arrayIds = [];
        orderList.forEach(d => {
            if(d.select) {
                arrayIds.push(d._id);
                
            }
        });
        console.log("delete :" + arrayIds);

//for delete state data 
           let list4 =  orderList.filter( (d)=>{
                return d.select == false;
            });
            console.log("new list :"+list4);
            setOrderList(list4);
//api for delete the data in database 

        axios.delete(`http://localhost:8000/delete/${arrayIds}`).then((response) => {
            if(response.status == 200) {
                //document.getElementById('delete').innerHTML = 'Order Deleted Successfully';
            }
        }).catch(error => 
            alert(error)
        );
    }
    const updateOrder = (id) => {
        axios.put("http://localhost:8000/update",{
            buyerOrder:buyerOrder,
            id:id
        });
    };

    return (
        <div className='App'>
            <h4 className='page-header'>BUYER DASHBOARD</h4>

            <form className='form row'>
                <div className='col col-sm-4'>

                    <input className='form-control' type="search" placeholder='Search By SKUID' onChange={(event) =>{
                        setID(event.target.value);
                    }}/>

                    <input className='form-control' type="search" placeholder='Search By PRODUCT NAME' onChange={(event) =>{
                        setProduct(event.target.value);
                    }}/>
                </div>
            </form><br/>

            { orderList.filter((val) => {
                if(searchProduct === '' && searchId === '') {
                    return val;
                } else if(val.productName.toLowerCase().includes(searchProduct.toLowerCase())) {
                    return val;
                }
            }).filter((val) => {
                if(val.skuid.toLowerCase().includes(searchId.toLowerCase())) {
                    return val;
                }
            }).map((val,key) => {
                return(
                    <div key={key} className="orders">
                        <table className='table table-secondary table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Date</th>
                                    <th>SKUID</th>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Origin</th>
                                    <th>Price USD($)</th>
                                    <th>Store 1 Order</th>
                                    <th>Store 2 Order</th>
                                    <th>Store 3 Order</th>
                                    <th>Buyer Order</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" onChange={(e)=>{
                                        let checked = e.target.checked;
                                        var list3 =  orderList.map((d) => {
                                            if(d._id==val._id){ d.select = checked;}
                                            return d;
                                            
                                        });
                                        console.log(list3);
                                        setOrderList(list3);
                                                                                   
                                            
                                    }} checked={val.select}/></td>
                                    <td>{val.date}</td>
                                    <td>{val.skuid}</td>
                                    <td>{val.orderid}</td>
                                    <td>{val.productName}</td>
                                    <td>{val.origin}</td>
                                    <td>{val.price}</td>
                                    <td>{val.store1order}</td>
                                    <td>{val.store2order}</td>
                                    <td>{val.store3order}</td>
                                    <td><input type="number" value={val.buyerOrder} required onChange={(event) => {
                                        setbuyerOrder(event.target.value);
                                    }}/></td>
                                    <td><button className='btn btn-primary' type='submit' onClick={() => updateOrder(val._id)}>Submit Order</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })
            }
            <button className='btn btn-primary' type='submit'>Save Draft</button>
            <a href='/add' className='btn btn-primary'>Add Order</a>
            <a href='/edit' className='btn btn-primary'>Edit order</a>
            <button type='submit' className='btn btn-primary' onClick={deleteId}>Delete</button>
            <button className='btn btn-primary' type='submit'>Logout</button>
        </div>
      );
}
 
export default Home;
