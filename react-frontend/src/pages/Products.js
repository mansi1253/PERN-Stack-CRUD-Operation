import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar/Navbar'
function Products() {

  const [products,setproducts]=useState([])


  const [category,setcategory]=useState([])
  const[value2,setvalue2]=useState([])
  const [updatedCategories,setUpdatedCategories]=useState([])


  const [name,setName]=useState()
  const [status,setStatus]=useState()
  const [cost,setCost]=useState()
  const [desc,setDesc]=useState()
  const [updatedName,setUpdatedName]=useState()
  const [updatedStatus,setUpdatedStatus]=useState()
  const [updatedCost,setUpdatedCost]=useState()
  const [updatedDesc,setUpdatedDesc]=useState()
  const [filteredData, setfilteredData] = useState([])

  useEffect(()=>{
    axios
    .get('http://127.0.0.1:5000/product/all')
    .then(res=>{
      setproducts(res.data.data)
      setfilteredData(res.data.data);
    })
    .catch(err=>{
      console.log('Error ',err)
    })


    axios
    .get('http://127.0.0.1:5000/category/all')
    .then(res=>{
      setcategory(res.data.data)
    })
    .catch(err=>{
      console.log('Error ',err)
    })

  },[])

  function filter(e){
    if(e.target.value===''){
      setfilteredData(products)
    }
    else{
      setfilteredData(
        products.filter((value)=>{
    return value.prodname.includes(e.target.value)})
      )
    }
  }
  function Update_handler(id,i){
    axios.put(`http://127.0.0.1:5000/product/${id}`,{'name':updatedName,'status':updatedStatus,'cost':updatedCost,'categories':updatedCategories,'description':updatedDesc})
    .catch(err=>{
      console.log('Error: ',err)
    })
  }
  function Delete_handler(id){
    axios.delete(`http://127.0.0.1:5000/product/${id}`)
    .catch(err=>{
      console.log('Error: ',err)
    })
  }
  function Add_handler(){


    if(value2.length!==0){
      axios.post(`http://127.0.0.1:5000/product/add`,{'prodName':name,'isactive':status,'cost':cost,'ProdCat':value2,'description':desc})


    .catch(err => {
        console.log('Error: ', err);
      });
    }
    else{
      alert('please insert category')
    }
  }

  return (
    <>
    <Navbar/>
    <div className='container my-5'>
      <div className='d-flex justify-content-between mb-5'>
        <div>
          <form>
            Search by Product Name: 
            <input placeholder='search' className='rounded-pill mx-2 px-4 py-2' onChange={(e)=>{filter(e)}}/>
          </form>
        </div>
        <div>
          <button className='rounded-pill bg-dark text-light py-2 px-4' data-bs-toggle='modal' data-bs-target='#addModal'>+ Add Product</button>
          <div className="modal fade" id="addModal">
                      <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" >Add Product</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                          </div>
                          <div className="modal-body py-4">
                            <form action='/'>
                              Name: <input onChange={(e)=>setName(e.target.value)}/> <hr/>
                              Status: <input type='radio' name='status' value={true} onChange={(e)=>setStatus(e.target.value)} className='mx-2'/>Active
                                      <input type='radio' name='status' value={false} onChange={(e)=>setStatus(e.target.value)} className='mx-2'/>In Active <hr/>
                              Cost: <input onChange={(e)=>setCost(e.target.value)}/> <hr/>
                              Categories: 
                             
                              <br></br><ul>
                              {category.map((catdata)=>{
                                  return(<li><input type='checkbox' onChange={(e)=>{
                                    if(value2.includes(e.target.value)){
                                      setvalue2(value2.filter((data)=>{
                                        return !(data===e.target.value)
                                      }))
                                    }
                                    else{
                                      setvalue2([...value2,e.target.value])
                                    }}
                                  } value={catdata.id}/>{catdata.name}<br></br></li>)
                                })}
                                </ul><hr></hr>
                            

                              Description: <textarea rows='3' onChange={(e)=>setDesc(e.target.value)}></textarea><br></br><hr></hr>
                            <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-success" onClick={Add_handler}data-bs-dismiss="modal">Add</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
        </div>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <th className='text-center'>Sr no.</th>
          <th className='text-center'>Name</th>
          <th className='text-center'>Status</th>
          <th className='text-center'>Cost</th>
          <th className='text-center'>Categories</th>
          <th className='text-center'>Description</th>
        </thead>
        <tbody>
          {filteredData.map((Product,index)=>{
            return(
              <tr>
                
                <th className='text-center'>{index+1}</th>
                <td className='text-center'>{Product.prodname}</td>
                {
                  Product.isactive?<td className='text-center'>Active</td>:<td className='text-center'>In Active</td>
                }
                <td className='text-center'>{Product.cost}</td>
                <td className='text-center'>
                {/* {JSON.stringify(Product)} */}
                {
                  category.map((cat) => {
                    if (Product.prodcat.includes(cat.id))
                    {
                      return(
                        <>
                        {
                          cat.name+' '
                        }
                        </>
                      )
                    }
                    else{
                      return(<></>)
                    }
                  })

                }
                </td> 
                <td className='text-center'>{Product.description}</td>
                <td className='text-start'>
                  
                  <button className='btn btn-success mx-3' data-bs-toggle="modal" data-bs-target={`#${Product.name}${Product.id}`} >Update </button>
                    <div className="modal fade" id={`${Product.name}${Product.id}`}>
                      <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" >Update Product</h5>
                            <button className="btn-close" data-bs-dismiss="modal">  </button>
                          </div>
                          <div className="modal-body py-4">
                            <form action='/'>
                              Name: <input onChange={(e)=>setUpdatedName(e.target.value)}/> <hr/>
                              Status: <input type='radio' name='status' value={true} onChange={(e)=>setUpdatedStatus(e.target.value)} className='mx-2'/>Active
                                      <input type='radio' name='status' value={false} onChange={(e)=>setUpdatedStatus(e.target.value)} className='mx-2'/>In Active <hr/>
                              Cost: <input type='number' onChange={(e)=>setUpdatedCost(e.target.value)}/> <hr/>
                              Categories: 
                              <br></br><ul>
                              {category.map((catdata)=>{
                                  return(<li><input type='checkbox' onChange={(e)=>{
                                    if(updatedCategories.includes(e.target.value)){
                                      setUpdatedCategories(updatedCategories.filter((data)=>{
                                        return !(data===e.target.value)
                                      }))
                                    }
                                    else{
                                      setUpdatedCategories([...updatedCategories,e.target.value])
                                    }}
                                  } value={catdata.id}/>{catdata.name}<br></br></li>)
                                })}
                                </ul><hr></hr>

                              Description: <textarea rows='3' onChange={(e)=>setUpdatedDesc(e.target.value)}></textarea><br></br><hr></hr>
                            <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-success" onClick={()=>Update_handler(Product.id,index)}data-bs-dismiss="modal" >Save Changes</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>


                  <button className='btn btn-danger mx-3' data-bs-toggle="modal" data-bs-target={`#del${Product.name}${Product.id}`}>Delete</button>
                  <div className="modal fade" id={`del${Product.name}${Product.id}`}>                
                    <div className="modal-dialog" >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" >Delete Product</h5>
                          <button className="btn-close" data-bs-dismiss="modal">
                            
                          </button>
                        </div>
                        <div className="modal-body">
                          Are You Sure? You want to delete this Product
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                          <button type="button" className="btn btn-danger mx-2" onClick={()=>Delete_handler(Product.id)} data-bs-dismiss="modal" >Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
    </>
  )
}

export default Products