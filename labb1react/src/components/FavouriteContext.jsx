import { useState, createContext } from 'react'
import { PropTypes } from 'prop-types'

const FavouriteContext = createContext()

const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([])

  const addFavourites = (item) => {
    setFavourites([...favourites, item])
  }

  return (
    <>
      <FavouriteContext.Provider value={{ favourites, addFavourites }}>
        {children}
      </FavouriteContext.Provider>
    </>
  )
}

FavouriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export { FavouriteContext, FavouriteProvider }
export default FavouriteContext
