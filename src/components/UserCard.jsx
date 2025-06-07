import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {
  //console.log(user)
  const {_id,firstName,lastName,about,age,gender,photoUrl}=user
  const dispatch=useDispatch()
  const reviewFeed=async(status,userId)=>{
    try{
      await axios.post(BASE_URL+"/request/send/"+status+"/"+userId ,{},{withCredentials:true})
      dispatch(removeFeed(userId))
    }
    catch(err){
      console.log(err.message)
    }
  }
  return (
    <div className="card bg-base-200 w-96 shadow-sm mt-10 mb-10">
  <figure className="px-10 pt-10">
    <img
      src={photoUrl}
      alt="photo"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    <p>{about}</p>
    {age && gender && <p>{ age+", "+gender}</p>}
    <div className="card-actions my-4">
      <button className="btn btn-primary" onClick={()=>reviewFeed("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>reviewFeed("interested",_id)}>Interested</button>
      
    </div>
  </div>
</div>
  )
}

export default UserCard
