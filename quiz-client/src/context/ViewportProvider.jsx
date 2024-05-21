import { createContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

export const viewportContext = createContext({})

function ViewportProvider({ children }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const viewportContextProviderValue = useMemo(
    () => ({ width, height }),
    [height, width],
  )

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <viewportContext.Provider value={viewportContextProviderValue}>
      {children}
    </viewportContext.Provider>
  )
}

ViewportProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ViewportProvider
