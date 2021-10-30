import create from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools(set => ({
    appRef: 'ref/hive-institute',
    // authenticated: false,
    // setAuthentication: () => set({ authenticated: true }),
    // user token for authentication
    token: null,
    setToken: e => set({ token: e === undefined ? null : e }),
    // user profile
    profile: null,
    setProfile: e => set({ profile: e }),
    // user payload
    payload: null,
    setPayload: e => set({ payload: e }),
    courses: null,
    setCourses: e => set({ courses: e }),
    // fetch all courses
    allCourses: null,
    setAllCourses: e => set({ allCourses: e })
  }))
)

export default useStore
