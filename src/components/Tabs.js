import clsx from 'clsx'
import { motion, AnimateSharedLayout } from 'framer-motion'

export default function Tabs({
  tabs,
  selected = Array.isArray(tabs) ? tabs[0] : Object.keys(tabs)[0],
  onChange = () => {},
  className = '',
  indicatorClassName = '',
  tabClassName = '',
  grid = false,
  spacing = 'normal',
  layout = 'column'
}) {
  return (
    <AnimateSharedLayout>
      <ul
        className={clsx('whitespace-nowrap', className, {
          flex: !grid,
          'space-x-2 sm:space-x-6': spacing === 'normal' && !grid && !layout,
          'space-x-2 sm:space-x-12': spacing === 'loose' && !grid && !layout,
          grid: grid,
          'gap-2 sm:gap-6': spacing === 'normal' && grid,
          'gap-2 sm:gap-12': spacing === 'loose' && grid
        })}
        style={{
          gridTemplateColumns:
            layout == 'column'
              ? `repeat(${
                Array.isArray(tabs) ? tabs.length : Object.keys(tabs).length
              }, minmax(0, 1fr))`
              : ``,
          gridTemplateRows:
            layout != 'column'
              ? `repeat(${
                Array.isArray(tabs) ? tabs.length : Object.keys(tabs).length
              }, minmax(0, 1fr))`
              : ``
        }}
      >
        {(Array.isArray(tabs) ? tabs : Object.keys(tabs)).map(tab => (
          <Indicator
            key={tab}
            tab={Array.isArray(tabs) ? tab : tabs[tab]}
            isSelected={selected === tab}
            onClick={() => onChange(tab)}
            indicatorClassName={indicatorClassName}
            tabClassName={tabClassName}
          />
        ))}
      </ul>
    </AnimateSharedLayout>
  )
}

function Indicator({
  tab,
  isSelected,
  onClick,
  indicatorClassName,
  tabClassName
}) {
  return (
    <li className="relative">
      {isSelected && (
        <motion.div
          layoutId="highlight"
          className={clsx('absolute inset-0', indicatorClassName)}
        />
      )}
      <button
        type="button"
        onClick={onClick}
        tabIndex={-1}
        className={clsx(
          'flex w-full relative z-10 leading-6 focus:outline-none transition-colors duration-300',
          tabClassName
        )}
      >
        {tab}
      </button>
    </li>
  )
}
