interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className='text-md z-10 flex flex-row gap-3 items-center font-bold text-primary transform-gpu line-clamp-1'>
      {/* <div className='cursor-pointer' onClick={toggleOpen}>
        <HamburgerIcon />
      </div> */}
      <span>{title}</span>
    </div>
  )
}

export default Header
