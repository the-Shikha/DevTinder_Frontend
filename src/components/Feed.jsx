import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Shimmer from './Shimmer'

const Feed = () => {
  const feedData = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    if (feedData) return
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
      dispatch(addFeed(res.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (!feedData) return <Shimmer />
  if (feedData.length <= 0) {
    return (
      <h1 className="text-xl sm:text-2xl text-center my-4 font-semibold">
        No new feed found !!
      </h1>
    )
  }

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 md:px-10 py-6 w-full">
      <div className="w-full max-w-md">
        <UserCard user={feedData[0]} />
      </div>
    </div>
  )
}

export default Feed

