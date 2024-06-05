import Sidebar from '../Parts/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='grow'>{children}</main>
    </div>
  )
}
