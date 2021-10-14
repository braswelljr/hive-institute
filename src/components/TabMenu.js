import { HiCreditCard, HiCalendar, HiAcademicCap } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'

export const dashboard = {
  courses: (
    <div className="flex items-center justify-start px-4 py-1 space-x-3">
      <HiAcademicCap className="w-auto h-5" />
      <span className="font-semibold">Courses</span>
    </div>
  ),
  events: (
    <div className="flex items-center justify-start px-4 py-1 space-x-3">
      <HiCalendar className="w-auto h-5" />
      <span className="font-semibold">Events</span>
    </div>
  ),
  profile: (
    <div className="flex items-center justify-start px-4 py-1 space-x-3">
      <FiUser className="w-auto h-5" />
      <span className="font-semibold">Profile</span>
    </div>
  ),
  account: (
    <div className="flex items-center justify-start px-4 py-1 space-x-3">
      <HiCreditCard className="w-auto h-5" />
      <span className="font-semibold">Account</span>
    </div>
  )
}
