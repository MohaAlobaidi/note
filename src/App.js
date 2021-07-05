import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


let getLocalStorage = ()=>{
  let list = localStorage.getItem('list')
  if(list){
   return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}



function App() {
  const[name,setName]=useState('')
  const[alert,setAlert]=useState({show:false,mes:'',type:''})
  const[list,setList]=useState(getLocalStorage())
  const[isEditing,setIsEditing]=useState(false)
  const[editId,setEditId]=useState(null)

  let handleSubmit =(e)=>{
    e.preventDefault();
    if(!name){
        //show alert
       showAlert(true,'pleas enter value','danger')
    }else if(name && isEditing){
      //deal with editing
   setList(
    list.map((item)=>{
      if(item.id === editId){
        return {...item,title:name}
      }return item
    })
    
  )
  setName('')
  setIsEditing(null)
  showAlert(true,'value change','success')
    }else{
      //show Alert
      showAlert(true,'item add to the list','success')
      const newItem = {title:name,id:new Date().getTime().toString()}
      console.log(newItem);
      setList([...list,newItem])
      setName('');
    }
  }



  let clearItems = ()=>{
    showAlert(true,'clear items','danger')
    setList([])
  }





  let removeItem = (id)=>{
    showAlert(true,'one item removed','danger')
    let newList = list.filter(item=>item.id !== id)
    setList(newList)
  }




const editItem = (id)=>{
const specificItem = list.find(item=> item.id ===id)
setIsEditing(true)
setEditId(id)
setName(specificItem.title)

}



let showAlert = (show=false,mes='',type='')=>{
  setAlert({show,mes,type})
}



useEffect(()=>{
localStorage.setItem('list',JSON.stringify(list))
},[list])




  return <section className="section-center">
    <div className="grocery-container">

        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>Grocery-bud</h3>
          <div className="form-control">
             <input className='grocery' type="text" placeholder="e.g. eegs" value={name} onChange={(e)=>setName(e.target.value)}/>
             <button className='submit-btn' type="submit"> {isEditing?'edit':'submit'}  </button>
          </div>
      
        </form>
      <List items={list} removeItem={removeItem} editItem={editItem} />
      <button className='clear-btn' onClick={clearItems} > 
      clear Items
      </button>
    </div>
  </section >
}

export default App
