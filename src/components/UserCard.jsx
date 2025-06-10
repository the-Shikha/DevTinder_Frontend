import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, age, gender, photoUrl } = user
  const dispatch = useDispatch()

  const reviewFeed = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true })
      dispatch(removeFeed(userId))
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="card bg-base-200 w-full max-w-md shadow-md mt-6 mb-6 mx-auto px-6 py-6">
      
      {/* Larger square photo */}
      <div className="flex justify-center mb-4">
        <div className="w-64 h-64 rounded-xl overflow-hidden border-2 border-primary">
          <img
            src={photoUrl}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="card-body items-center text-center px-4">
        <h2 className="card-title text-xl sm:text-2xl font-semibold">
          {firstName + " " + lastName}
        </h2>
        <p className="text-sm sm:text-base mt-1">{about}</p>
        {age && gender && <p className="text-sm sm:text-base mt-1">{`${age}, ${gender}`}</p>}

        <div className="card-actions mt-6 flex flex-row justify-center gap-4">
          <button
            className="btn btn-primary"
            onClick={() => reviewFeed("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => reviewFeed("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard





