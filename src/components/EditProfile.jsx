import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)
  const [about, setAbout] = useState(user.about)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowTest] = useState(false)

  const dispatch = useDispatch()

  const saveProfile = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      )
      dispatch(addUser(res?.data?.data))
      setShowTest(true)
      setTimeout(() => {
        setShowTest(false)
      }, 3000)
    } catch (err) {
      setError(err.response?.data || "Something went wrong")
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 py-10 lg:px-20 mb-20">
        {/* Form */}
        <div className="w-full max-w-md">
          <div className="card bg-base-300 shadow-2xl p-6 sm:p-8">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>

              <div className="space-y-4">
                <div>
                  <label className="label">First Name</label>
                  <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Last Name</label>
                  <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Gender</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Photo URL</label>
                  <input
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">About</label>
                  <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                    className="textarea textarea-bordered w-full"
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <button
                    className="btn btn-primary w-full"
                    onClick={saveProfile}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UserCard */}
        <div className="w-full max-w-md">
          <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-info">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProfile

