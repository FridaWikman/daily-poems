import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import {
  DivWrapper,
  Button,
  HeadingM,
  Paragraph,
  PoemDiv,
  ListDiv,
  BigWrapperDiv,
  ListUl,
  HeadingL,
} from './Styled'
import FavouriteContext from './FavouriteContext'

function Home(props) {
  const [randPoem, setRandPoem] = useState([])

  const { favourites } = useContext(FavouriteContext)

  useEffect(() => {
    fetchRandomPoem()
  }, [])

  function fetchRandomPoem() {
    fetch('https://poetrydb.org/random/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((result) => {
        if (result && Array.isArray(result)) {
          setRandPoem(result)
        } else {
          throw new Error('Unexpected data format from API')
        }
      })
      .catch((error) => {
        console.error('Error fetching Poem:', error)
      })
  }

  return (
    <>
      <HeadingL>{props.header}</HeadingL>
      <BigWrapperDiv>
        <ListDiv>
          <h3>My favourite authors</h3>

          {favourites.length > 0 && (
            <ListUl>
              {favourites.map((favourite) => (
                <li key={favourite}>{favourite}</li>
              ))}
            </ListUl>
          )}

          <p>
            Add authors here: <Link to="/authors">Authors</Link>
          </p>
        </ListDiv>
        <DivWrapper>
          <Button onClick={fetchRandomPoem}>Get new poem</Button>
          <PoemDiv>
            {randPoem &&
              randPoem.map((poem) => (
                <div key={poem.title}>
                  <h2>{poem.title}</h2>
                  <HeadingM>{poem.author}</HeadingM>
                  {poem.lines.map((line, index) => (
                    <Paragraph key={index}>{line}</Paragraph>
                  ))}
                </div>
              ))}
          </PoemDiv>
        </DivWrapper>
      </BigWrapperDiv>
    </>
  )
}

Home.propTypes = {
  header: PropTypes.string,
}
export default Home
