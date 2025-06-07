import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch=useDispatch()

    const getConnections=async ()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
            //console.log(res.data.data)
            dispatch(addConnection(res.data.data))
            
        }
        catch(err){
            console.log(err.message)
        }
    }

    useEffect(()=>{
        getConnections()
    },[])

    const connections =useSelector(store=>store.connection)
    //console.log(connections)

    if(!connections) return;
    if(connections.length===0) return <h1 className='text-2xl justify-center flex my-10'>No Connections found !!</h1>

    return (
        <div>
     <h1 className='text-2xl justify-center flex mt-4 font-semibold'>Connections</h1>
    {connections.map(connection=>{
        return (
        <div key={connection._id}>
        <div className="flex justify-center my-4">
        
  <div className="card card-side bg-primary text-primary-content w-[28rem] shadow-xl">
    <figure className="p-4">
      <div className="avatar">
        <div className="w-28 h-28 aspect-square rounded-full ring-2 ring-offset-2 ring-primary ring-offset-base-100 overflow-hidden">
          <img src={connection.photoUrl} className="object-cover w-full h-full" />
        </div>
      </div>
    </figure>
    <div className="card-body">
      <h2 className="card-title">{connection.firstName + " " + connection.lastName}</h2>
      <p>{connection.about}</p>
      <p>{connection.age + ", " + connection.gender}</p>
      <div className="card-actions justify-end">
        <button className="btn">Message</button>
      </div>
    </div>
  </div>
</div>
</div>

)
    })}
    </div>
  )
}

export default Connections
