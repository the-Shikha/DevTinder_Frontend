import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnectionRequest, removeConnectionRequest } from '../utils/requestSlice'

const ConnectionRequest = () => {
    const dispatch=useDispatch()

    const getConnectionRequest=async ()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
            console.log(res.data.data)
            dispatch(addConnectionRequest(res.data.data))
            
        }
        catch(err){
            console.log(err.message)
        }
    }

    useEffect(()=>{
        getConnectionRequest()
    },[])
    const reviewRequest=async (status,_id)=>{
        
        try{
            await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeConnectionRequest(_id))
        }
        catch(err){
            console.log(err.message)
        }
    }

    const connectionRequest =useSelector(store=>store.connectionRequest)
    //console.log(connections)

    if(!connectionRequest) return;
    if(connectionRequest.length===0) return <h1 className='text-2xl justify-center flex my-10'>No Connection Requests Recieved !!</h1>

    return (
        <div>
     <h1 className='text-2xl justify-center flex mt-4 font-semibold'>Connection Request Recieved</h1>
    {connectionRequest.map(connection=>{
        const {_id,firstName,lastName,photoUrl,about,age,gender}=connection.fromUserId
        return (
            
        <div key={_id}>
        <div className="flex justify-center my-4">
        
  <div className="card card-side bg-primary text-primary-content w-[28rem] shadow-xl">
    <figure className="p-4">
      <div className="avatar">
        <div className="w-28 h-28 aspect-square rounded-full ring-2 ring-offset-2 ring-primary ring-offset-base-100 overflow-hidden">
          <img src={photoUrl} className="object-cover w-full h-full" />
        </div>
      </div>
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      <p>{about}</p>
      <p>{age + ", " + gender}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-secondary" onClick={()=>reviewRequest("rejected",connection._id)}>Ignore</button>
        <button className="btn btn-neutral" onClick={()=>reviewRequest("accepted",connection._id)}>Accept</button>
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

export default ConnectionRequest
