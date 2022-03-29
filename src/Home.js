import axios from 'axios';
import { Modal } from 'bootstrap';
import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';

const Home = () => {

    const [orderList,setOrderList] = useState([]);
   // const [buyerOrder,setbuyerOrder] = useState('');
    const [searchProduct,setProduct] = useState('');
    const [searchId,setID] = useState('');
    const [newOrderList,setNewList] = useState([]);


    useEffect(() =>{
        axios.get(/*("https://browser-buyer.herokuapp.com")||*/"http://localhost:8000").then((response)=>{
            setOrderList(response.data);
        });
    },[]);

    const updateOrder = () => {

            let arrayIds = [];
            let arrayOds = [];
            let array = [];
    
            orderList.forEach(d => {
                if(d.select) {
                    let obj = {};
                    obj.id = d._id;
                    arrayIds.push(d._id);
                    arrayOds.push(d.buyerOrder);
                    obj.buyerOrder = d.buyerOrder;
                    array.push(JSON.stringify(obj));
                }
            });
            console.log(arrayIds);
            console.log(arrayOds);
    
             axios.post(`http://localhost:8000/update/${arrayIds}&${arrayOds}`).catch(error => 
                alert(error)
            ); 
    };

    const deleteById = () => {
        let arrayIds = [];
        orderList.forEach(d => {
            if(d.select) {
                arrayIds.push(d._id);
            }
        });
        axios.delete(`http://localhost:8000/delete/${arrayIds}`).catch(error => 
            alert(error)
        );
    };

   const editById = () => {
        
        let id = [];
        orderList.forEach(d => {
            if(d.select) {
                id.push(d._id);
            }
        });
        axios.get(`http://localhost:8000/${id}`).then(res => {
            setNewList(res);
        });
    };

    orderList.map((d) => {
        return {
            select:false,
            _id:d._id,
            skuid:d.skuid,
            orderid:d.orderid,
            productName:d.productName,
            origin:d.origin,
            price:d.price,
            store1order:d.store1order,
            store2order:d.store2order,
            store3order:d.store3order,
            buyerOrder:d.buyerOrder
        };
    });

    return (
        <div className='App container'>
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

            <div>
                <table className='table table-secondary table-bordered table-hover'>
                    <thead>
                            <tr>
                                <th><input type="checkbox" onChange={(event) => {
                                    let checked = event.target.checked;
                                    setOrderList(orderList.map((d)=>{
                                        d.select = checked;
                                        return d;
                                    }));
                                }}/></th>
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
                            </tr>
                    </thead>
                    
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
                            <tbody>
                                <tr key={key}>
                                    <td><input type="checkbox" onChange={(event) => {
                                        let checked = event.target.checked;
                                        setOrderList(orderList.map((data) => {
                                            if(val._id === data._id){
                                                data.select = checked;
                                            }
                                            return data;
                                        }));
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

                                        let od = event.target.value;
                                        var list4 =  orderList.map((d) => {

                                            if(d._id ===val._id){ 
                                                d.buyerOrder = od;
                                            }
                                            return d;
                                            
                                        });
                                        setOrderList(list4);
                                    }}/></td>
                                </tr>
                            </tbody>
                );
            })
            }
                </table>
            </div>

            <button className='btn btn-primary' type='submit' onClick={updateOrder}>Submit</button>
            <button className='btn btn-primary' type='submit'>Save Draft</button>
            <a href='/add' className='btn btn-primary'>Add Order</a>
            <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#editModal' onClick={editById}>Edit order</button>
            <button type='submit' className='btn btn-primary' onClick={deleteById}>Delete Order</button>
            <button className='btn btn-primary' type='submit'>Logout</button>

            {/*Edit Modal */}
            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Order</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            <div class="container">
                                <form className='form'>
                                    <div className='col'>
                                        <label>Date</label>
                                        <input type="date" className='form-control'/>
                                    </div><br/>

                                    <div className='col'>
                                        <label>Product Name</label>
                                        <input type="text" className='form-control'/>
                                    </div><br/>

                                    <div className='col'>
                                        <label>Origin</label>
                                        <input type="text" className='form-control'/>
                                    </div><br/>

                                    <div className='col'>
                                        <label>Price USD($)</label>
                                        <input type="number" className='form-control'/>
                                    </div><br/>

                                    <div className='col'>
                                        <label>Store 1 Order</label>
                                        <input type="number" className='form-control'/>
                                    </div><br/>

                                    <div className='col'>
                                        <label>Store 2 Order</label>
                                        <input type="number" className='form-control'/>
                                    </div><br/>

                                    <div className='col'>
                                        <label>Store 3 Order</label>
                                        <input type="number" className='form-control'/>
                                    </div><br/>

                                    <div className='col'>
                                        <label>Buyer Order</label>
                                        <input type="number" className='form-control'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}
 
export default Home;
