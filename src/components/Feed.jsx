import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
    const feedData=useSelector((store)=>store.feed)
    //console.log(feedData)
    const dispatch=useDispatch()
    const getFeed=async()=>{
        if(feedData) return ;
        try{
            
            const res=await axios.get(BASE_URL+"/feed",{withCredentials:true})
            //console.log(res)
            dispatch(addFeed(res.data))
        }
        catch(err){
            console.log(err.message)
        }
    } 
    useEffect(()=>{
        getFeed()
    },[])
  if(!feedData) return;
  if(feedData.length<=0) return <h1 className='text-2xl justify-center flex my-4 font-semibold'>No new feed found !!</h1>
  return  (
    feedData && (<div className='flex justify-center my-15'>
        <UserCard user={feedData[0]}/>
    </div>)
  )
}

export default Feed
