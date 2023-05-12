import { useTheme } from "next-themes"
import cn from "classnames"
import { TbChevronDown, TbColorSwatch } from "react-icons/tb"

import themesConfig from "themes.config.json"

const ThemePicker: React.FC = () => {
  const { setTheme, theme: currentTheme } = useTheme()

  return (
    <div className='dropdown dropdown-end transition-all' title='Change Theme'>
      <div tabIndex={0} className='btn btn-ghost gap-1 normal-case px-3 lg:px-4'>
        <TbColorSwatch
          aria-hidden='true'
          className='inline-block h-5 w-5 stroke-current md:h-6 md:w-6'
        />
        <span className='hidden md:inline'>Theme</span>
        <TbChevronDown
          aria-hidden='true'
          className='ml-1 hidden h-3 w-3 stroke-current opacity-70 sm:inline-block'
        />
      </div>

      <div
        tabIndex={0}
        className='dropdown-content shadow-2xl bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] overflow-y-auto w-52 mt-16'>
        <ul className='grid grid-cols-1 gap-3 p-3 menu'>
          {themesConfig.themes.map(theme => (
            <li
              aria-label={theme}
              key={theme}
              data-theme={theme}
              className='outline-base-content overflow-hidden rounded-btn outline-2 outline-offset-2'>
              <div
                data-theme={theme}
                data-set-theme={theme}
                className={cn(
                  "bg-base-100 text-base-content w-full cursor-pointer font-sans p-0 m-0 block border-2",
                  {
                    "border-primary shadow-inner":
                      currentTheme && theme === currentTheme,
                    "border-transparent shadow-lg":
                      !currentTheme || theme !== currentTheme,
                  }
                )}
                onClick={() => setTheme(theme)}>
                <div className='flex gap-1 py-3 px-4'>
                  <div className='flex-grow text-sm font-bold'>{theme}</div>
                  <div className='flex items-center flex-shrink-0 flex-wrap gap-x-1 rounded overflow-hidden'>
                    <div className='rounded-full bg-primary w-3 h-3'></div>
                    <div className='rounded-full bg-secondary w-3 h-3'></div>
                    <div className='rounded-full bg-accent w-3 h-3'></div>
                    <div className='rounded-full bg-neutral w-3 h-3'></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ThemePicker
