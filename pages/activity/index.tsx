import { useEffect, useState } from 'react'

import ActivityCalendar, { Activity, ThemeInput } from 'react-activity-calendar'
import GitHubCalendar from 'react-github-calendar'

const customTheme: ThemeInput = {
  light: ['#161a23', '#803300', '#bf5700', '#ff7300', '#ffad42'],
  dark: ['#161a23', '#803300', '#bf5700', '#ff7300', '#ffad42']
}

export default function ActivityPage() {
  const [activityData, setActivityData] = useState<Activity[]>([
    {
      date: '2024-01-01',
      count: 0,
      level: 0
    },
    {
      date: '2024-12-31',
      count: 0,
      level: 0
    }
  ])

  useEffect(() => {
    const formattedData: Activity[] = [
      {
        date: '2024-01-01',
        count: 0,
        level: 0
      }
    ]

    fetch('http://127.0.0.1:5000/activity-graph-data')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        for (const key in data) {
          formattedData.push({
            date: key,
            count: data[key].length,
            level: data[key].length % 4
          })
        }

        setActivityData([
          ...formattedData,
          {
            date: '2024-12-31',
            count: 0,
            level: 0
          }
        ])
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
          <div className='text-md text-bold'>Gym & Cycling</div>
          <ActivityCalendar data={activityData} theme={customTheme} />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='text-md text-bold'>Github Contribution</div>
          <GitHubCalendar
            username='manishgotame'
            year={new Date().getFullYear()}
          />
        </div>
      </div>
    </div>
  )
}
