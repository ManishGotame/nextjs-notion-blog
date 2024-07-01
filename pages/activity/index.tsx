import { useEffect, useState } from 'react'

import ActivityCalendar, { Activity, ThemeInput } from 'react-activity-calendar'
import GitHubCalendar from 'react-github-calendar'

import Header from '@/components/Parts/Header'

const cyclingTheme: ThemeInput = {
  light: ['#161a23', '#803300', '#bf5700', '#ff7300', '#ffad42'],
  dark: ['#161a23', '#803300', '#bf5700', '#ff7300', '#ffad42']
}

const gymTheme: ThemeInput = {
  light: ['#161a23', '#005b99', '#007cc3', '#339fd8', '#66c2ec'],
  dark: ['#161a23', '#003366', '#005b99', '#007cc3', '#339fd8']
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
          <ActivityCalendar data={cyclingData} theme={cyclingTheme} />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex content-center items-center gap-4 text-md text-bold'>
            Gym Activity
            <a
              href='https://connect.garmin.com/modern/profile/5261c750-38a1-4e40-a398-b1c7eea85732'
              target='_blank'
              className='bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'
              rel='noreferrer'
            >
              Open Garmin
            </a>
          </div>
          <ActivityCalendar data={gymData} theme={gymTheme} />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex content-center items-center gap-2 text-md text-bold'>
            Github Activity
            <a
              href='https://github.com/manishgotame'
              target='_blank'
              className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
              rel='noreferrer'
            >
              Open Github
            </a>
          </div>{' '}
          <GitHubCalendar
            username='manishgotame'
            year={new Date().getFullYear()}
          />
        </div>
      </div>
    </div>
  )
}
