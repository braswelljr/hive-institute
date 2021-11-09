import { useState } from 'react'
import Tabs from '@/components/Tabs'

const Events = () => {
  const [eventState, setEventState] = useState('upcoming')
  return (
    <main className="text-gray-700">
      <h1 className="text-2xl font-bold">Events</h1>
      <Tabs
        tabs={{
          upcoming: 'Upcoming Events',
          past: 'Past Events'
        }}
        selected={eventState}
        onChange={setEventState}
        className="mt-5"
        indicatorClassName="bg-primary-thin rounded-full"
        tabClassName="text-gray-700 px-4 py-1 text-sm font-semibold"
      />
    </main>
  )
}

export default Events
