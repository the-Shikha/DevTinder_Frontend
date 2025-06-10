import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch()

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      })
      dispatch(addConnection(res.data.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getConnections()
  }, [])

  const connections = useSelector((store) => store.connection)

  if (!connections) return null
  if (connections.length === 0)
    return (
      <h1 className="text-lg sm:text-xl text-center font-medium my-10">
        No Connections Found !!
      </h1>
    )

  return (
    <div className="px-4">
      <h1 className="text-xl text-center font-semibold mt-6 mb-4">Connections</h1>

      {connections.map((connection) => (
        <div key={connection._id} className="flex justify-center mb-6">
          <div className="bg-primary text-primary-content w-full max-w-md rounded-xl shadow-lg p-4 flex gap-4 items-start">
            
            {/* Profile Photo */}
            <div className="w-24 h-24 rounded-full overflow-hidden ring ring-offset-base-100 ring-offset-2 ring-primary flex-shrink-0">
              <img
                src={connection.photoUrl}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info + Button */}
            <div className="flex-1">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold">
                  {connection.firstName + ' ' + connection.lastName}
                </h2>
                <p className="text-sm">{connection.about}</p>
                <p className="text-sm text-gray-200">
                  {connection.age + ', ' + connection.gender}
                </p>
              </div>

              {/* Button right-aligned */}
              <div className="flex justify-end mt-3">
                <button className="btn btn-neutral btn-sm">Message</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Connections


