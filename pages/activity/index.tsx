import { useEffect, useState } from 'react'

import ActivityCalendar, { Activity, ThemeInput } from 'react-activity-calendar'
import GitHubCalendar from 'react-github-calendar'

const customTheme: ThemeInput = {
  light: ['#161a23', '#803300', '#bf5700', '#ff7300', '#ffad42'],
  dark: ['#161a23', '#803300', '#bf5700', '#ff7300', '#ffad42']
}

const yearStartActivity: Activity = {
  date: '2024-01-01',
  count: 0,
  level: 0
}

const yearEndActivity: Activity = {
  date: '2024-12-31',
  count: 0,
  level: 0
}

const emptyData = [yearStartActivity, yearEndActivity]
const cyclingActivityTypes = ['cycling', 'mountain_biking']

export default function ActivityPage() {
  const [cyclingData, setCyclingData] = useState<Activity[]>(emptyData)
  const [gymData, setGymData] = useState<Activity[]>(emptyData)

  useEffect(() => {
    const formattedCyclingData: Activity[] = [yearStartActivity]
    const formattedGymData: Activity[] = [yearStartActivity]

    fetch('https://garmin-sync-api.vercel.app/activity-graph-data')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        for (const key in data) {
          const cyclingCount = data[key].reduce((total, activity) => {
            if (cyclingActivityTypes.includes(activity)) total += 1
            return total
          }, 0)

          formattedCyclingData.push({
            date: key,
            count: cyclingCount,
            level: cyclingCount % 4
          })

          formattedGymData.push({
            date: key,
            count: data[key].length - cyclingCount,
            level: (data[key].length - cyclingCount) % 4
          })
        }

        setCyclingData([...formattedCyclingData, yearEndActivity])
        setGymData([...formattedGymData, yearEndActivity])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='h-[100%] p-5 border-r border-gray-150 pb-10 transition duration-200 ease-in-out dark:border-gray-800 lg:translate-x-0'>
      <div className='text-md font-bold text-primary transform-gpu line-clamp-1'>
        Activity Heatmap
      </div>

      <div className='mt-10 flex flex-col items-center gap-20'>
        <div className='flex flex-col gap-5'>
          <div className='text-md text-bold'>Cycling Activity</div>
          <ActivityCalendar data={cyclingData} theme={customTheme} />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='text-md text-bold'>Gym Activity</div>
          <ActivityCalendar data={gymData} theme={customTheme} />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='text-md text-bold'>Github Activity</div>
          <GitHubCalendar
            username='manishgotame'
            year={new Date().getFullYear()}
          />
        </div>
      </div>
    </div>
  )
}
