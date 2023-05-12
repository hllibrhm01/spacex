type HeaderProps = { title: string; tag?: `h${1 | 2}` }

const Header: React.FC<HeaderProps> = ({ title, tag = "h2" }) => {
  return (
    <header className='container prose dark:prose-invert flex flex-col w-full mx-auto justify-center items-center max-w-4xl mb-10 sm:mb-16'>
      {tag === "h2" ? (
        <h2
          id='title'
          className='capitalize text-4xl md:text-5xl text-center text-base-content'
        >
          {title}
        </h2>
      ) : (
        <h1
          id='title'
          className='capitalize leading-tight text-5xl md:text-6xl text-center text-base-content'
        >
          {title}
        </h1>
      )}
    </header>
  )
}

export default Header
