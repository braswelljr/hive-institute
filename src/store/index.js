import create from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools(set => ({
    appRef: 'ref/hive-institute',
    token: null,
    setToken: e => set({ token: e === undefined ? null : e }),
    // user payload
    payload: null,
    setPayload: e => set({ payload: e }),
    courses: null,
    setCourses: e => set({ courses: e })
  }))
)

export default useStore
