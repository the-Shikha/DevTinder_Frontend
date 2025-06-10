import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnectionRequest, removeConnectionRequest } from '../utils/requestSlice'

const ConnectionRequest = () => {
  const dispatch = useDispatch()

  const getConnectionRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
      dispatch(addConnectionRequest(res.data.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getConnectionRequest()
  }, [])

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
      dispatch(removeConnectionRequest(_id))
    } catch (err) {
      console.log(err.message)
    }
  }

  const connectionRequest = useSelector(store => store.connectionRequest)

  if (!connectionRequest) return null
  if (connectionRequest.length === 0)
    return <h1 className='text-xl text-center my-10'>No Connection Requests Received !!</h1>

  return (
    <div className="px-4">
      <h1 className='text-xl text-center font-semibold mt-6 mb-4'>Connection Requests Received</h1>

      {connectionRequest.map(connection => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } = connection.fromUserId
        return (
          <div key={_id} className="flex justify-center mb-6">
            <div className="bg-primary text-primary-content w-full max-w-md rounded-xl shadow-lg p-4 flex gap-4 items-start">
              
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden ring ring-offset-base-100 ring-offset-2 ring-primary flex-shrink-0">
                <img src={photoUrl} alt="User" className="w-full h-full object-cover" />
              </div>

              {/* Details + Buttons */}
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">{firstName + " " + lastName}</h2>
                  <p className="text-sm">{about}</p>
                  <p className="text-sm text-gray-200">{age + ", " + gender}</p>
                </div>

                {/* Buttons Right-Aligned */}
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => reviewRequest("rejected", connection._id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="btn btn-neutral btn-sm"
                    onClick={() => reviewRequest("accepted", connection._id)}
                  >
                    Accept
                  </button>
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





