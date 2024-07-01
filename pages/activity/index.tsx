import { useEffect, useState } from 'react'

import ActivityCalendar, { Activity, ThemeInput } from 'react-activity-calendar'
import GitHubCalendar from 'react-github-calendar'

import Header from '@/components/Parts/Header'

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
      <Header title={'Activity Heatmap'} />

      <div className='mt-10 flex flex-col items-center gap-20'>
        <div className='flex flex-col gap-5'>
          <div className='flex content-center items-center gap-2 text-md text-bold'>
            Cycling Activity
            <a
              href='https://www.strava.com/athletes/48020538'
              target='_blank'
              className='cursor-pointer bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'
              rel='noreferrer'
            >
              Open Strava
            </a>
          </div>
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
