import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar/Navbar'
function Category() {

  const [categories,setCategories]=useState([])
  const [name,setName]=useState()
  const [status,setStatus]=useState()
  const [desc,setDesc]=useState()
  const [updatedName,setUpdatedName]=useState()
  const [updatedStatus,setUpdatedStatus]=useState()
  const [updatedDesc,setUpdatedDesc]=useState()
  const [filteredData, setfilteredData] = useState([])

  useEffect(()=>{
    axios
    .get('http://127.0.0.1:5000/category/all')
    .then(res=>{
      console.log(res.data)
      setCategories(res.data.data)
      setfilteredData(res.data.data);
    })
    .catch(err=>{
      console.log('Error ',err)
    })
    console.log(categories)
  },[])

  function filter(e){
    if(e.target.value===''){
      setfilteredData(categories)
    }
    else{
      setfilteredData(
        categories.filter((value)=>{
    return value.name.includes(e.target.value)})
      )
    }
  }
  function Update_handler(id){
    axios.put(`http://127.0.0.1:5000/category/${id}`,{'name':updatedName,'status':updatedStatus,'description':updatedDesc})
    .catch(err=>{
      console.log('Error: ',err)
    })
  }
  function Delete_handler(id){
    axios.delete(`http://127.0.0.1:5000/category/${id}`)
    .catch(err=>{
      console.log('Error: ',err)
    })
  }
  function Add_handler(){
    axios.post(`http://127.0.0.1:5000/category/add`,{'name':name,'isactive':status,'description':desc})
    .catch(err => {
      console.log('Error: ', err);
    });
  }

  return (
    <>
    <Navbar/>
    <div className='container my-5'>
      <div className='d-flex justify-content-between mb-5'>
        <div>
          <form>
            Search by Category Name: 
            <input placeholder='search' className='rounded-pill px-4 mx-2 py-2' onChange={(e)=>{filter(e)}}/>
          </form>
        </div>
        <div>
          <button className='rounded-pill bg-dark text-light py-2 px-4' data-bs-toggle='modal' data-bs-target='#addModal'>+ Add Category</button>
          <div className="modal fade" id="addModal">
                      <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" >Add Category</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                          </div>
                          <div className="modal-body py-4">
                            <form action='/category'>
                              Name: <input onChange={(e)=>setName(e.target.value)}/> <hr/>
                              Status: <input type='radio' name='status' value={true} onChange={(e)=>setStatus(e.target.value)} className='mx-2'/>Active
                                      <input type='radio' name='status' value={false} onChange={(e)=>setStatus(e.target.value)} className='mx-2'/>In Active <hr/>
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
          <th className='text-center'>Description</th>
          <th></th>
        </thead>
        <tbody>
          {filteredData.map((Category,index)=>{
            return(
              <tr>
                <th className='text-center'>{index+1}</th>
                <td className='text-center'>{Category.name}</td>
                {
                  Category.isactive?<td className='text-center'>Active</td>:<td className='text-center'>In Active</td>
                }
                <td className='text-center'>{Category.description}</td>
                <td className='text-start'>
                  <button className='btn btn-success mx-3' data-bs-toggle="modal" data-bs-target={`#${Category.name}${Category.id}`}>Update</button>
                    <div className="modal fade" id={`${Category.name}${Category.id}`}>
                      <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" >Update Category</h5>
                            <button className="btn-close" data-bs-dismiss="modal">  </button>
                          </div>
                          <div className="modal-body py-4">
                            <form>
                              Name: <input onChange={(e)=>setUpdatedName(e.target.value)}/> <hr/>
                              Status: <input type='radio' name='status' value={true} onChange={(e)=>setUpdatedStatus(e.target.value)} className='mx-2'/>Active
                                      <input type='radio' name='status' value={false} onChange={(e)=>setUpdatedStatus(e.target.value)} className='mx-2'/>In Active <hr/>
                              Description: <textarea rows='3' onChange={(e)=>setUpdatedDesc(e.target.value)}></textarea>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Discard</button>
                            <button type="button" className="btn btn-success" onClick={()=>Update_handler(Category.id)}data-bs-dismiss="modal" >Save Changes</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  <button className='btn btn-danger mx-3' data-bs-toggle="modal" data-bs-target={`#del${Category.name}${Category.id}`}>Delete</button>
                  <div className="modal fade" id={`del${Category.name}${Category.id}`}>
                    <div className="modal-dialog" >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" >Delete Category</h5>
                          <button className="btn-close" data-bs-dismiss="modal">
                            
                          </button>
                        </div>
                        <div className="modal-body">
                          Are You Sure? You want to delete this category
                        </div>
                        <div className="modal-footer">
                          <form ACTION='/category'>
                            <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-danger" onClick={()=>Delete_handler(Category.id)} data-bs-dismiss="modal" >Delete</button>
                          </form>
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

export default Category