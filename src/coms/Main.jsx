import React,{useState , useEffect} from 'react'
import { collection, addDoc, getDoc,QuerySnapshot, query, getDocs,doc, onSnapshot, deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase';



function Main() {
    const[items ,setitems]=useState
    ([]);
    //{name: 'coffee' , price:350},{name:'biryani',price:500},{name:'travel', price:100}
    const [total ,settotal]=useState(0);
    const[newitem,setnewitem]= useState({name:'',price:''});

    //addding items to database.
    const additem=async(e) =>{
      e.preventDefault();
      if(newitem.name!=='' && newitem.price!==''){
        //setitems({...items,newitem});
        await addDoc(collection(db,'items'),{
          name:newitem.name.trim(),
          price:newitem.price,
        });
        setnewitem({name:'' , price:''});
      }
      
    }

    //reading from db
    useEffect(()=>{
      const q=query(collection(db,'items'))
      const pushintoarray = onSnapshot(q,(QuerySnapshot)=>{
        let itemsarr=[]
        QuerySnapshot.forEach((doc)=>{
          itemsarr.push({...doc.data(), id:doc.id})
        })
        setitems(itemsarr);



        //reading the total from items array
        let totprice=0
        Object.values(itemsarr).map(x=>{
          
          totprice+=Number(x.price)
          settotal(totprice)

        })

      })

    },[])

    //deleting from database
    const deleteitem = async(f) =>{
      await deleteDoc(doc(db,'items', f));
      
    };

    //clear
    const clr =()=>{
      Object.values(items).map(x=>{
        deleteitem(x.id);
      })

    }

  return (
    <div className='flex flex-col items-center bg-black h-screen justify-center font-bold'>
      <div>
      <div className='p-6 flex flex-col items-center text-white justify-end' >
        <h1 className='text-6xl font-bold '>Expense Tracker</h1>
        <div className='flex items-center mt-5'>
        <p className='font-light '>Track Your Daily Expenses.</p>
        <p className='animate-bounce mx-2'>₹</p>

        </div>
        
      </div>
      <div className='bg-slate-900 p-4 rounded items-center'>
        <form className='' action="">
          <input type="text"  className='mx-3 rounded p-2' placeholder='Enter Item' 
           value={newitem.name} onChange={(e) => setnewitem({...newitem, name:e.target.value})} />
          <input type="text" className='mx-3 rounded p-2' placeholder='Enter Price ₹' value={newitem.price} onChange={(e)=>setnewitem({...newitem,price:e.target.value})} />
          <button type='submit' className=' hover:bg-slate-600 px-4 py-2 ml-2 rounded text-white font-bold text-xl' onClick={additem}>+</button>
        </form>

        <ul className='py-2 text-white'>
          {Object.values(items).map((x,id)=>
           { 
              return <li key={id} className='w-full justify-between flex bg-slate-950 my-2 rounded'>
                <div className='justify-between w-full flex p-2 mx-2 items-center'>
                  <span className='capitalize'>{x.name}</span>
                  <span>{x.price} ₹</span>
                </div>
                <button className='ml-8 p-4 hover:bg-slate-600 rounded' onClick={()=>deleteitem(x.id)}>x</button>
              </li>;
             

            } )}
          
          
        </ul>
        {items.length<1 ? (<div className='justify-between flex w-full px-2 text-white'>
          <span className='ml-2'>Total</span>
          <span className='mr-20'>0 ₹</span>
        </div>): (
        <div className='justify-between flex w-full px-2 text-white'>
          <span className='ml-2'>Total</span>
          <span className='mr-20'>{total} ₹</span>
        </div>
        )}
      


      </div>
      <button className='text-white font-2xl p-2 my-2 hover:bg-slate-600 rounded' onClick={clr}>Clear List</button>
      


      </div>
    </div>
 
  )
}

export default Main
