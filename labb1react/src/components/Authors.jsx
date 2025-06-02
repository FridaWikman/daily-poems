import { useEffect, useState, useContext, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import {
  DivWrapper,
  HeadingM,
  HeadingS,
  PoemDiv,
  BigWrapperDiv,
  ListDiv,
  InputDiv,
  ListUl,
  HeadingL,
  Paragraph,
} from './Styled'
import FavouriteContext from './FavouriteContext'

function Authors(props) {
  const [authors, setAuthors] = useState([]),
    [selectedAuthor, setSelectedAuthor] = useState(''),
    [poemsByAuthor, setPoemsByAuthor] = useState([]),
    [poemByTitle, setPoemByTitle] = useState([]),
    { authorName } = useParams(),
    navigate = useNavigate()

  const { favourites, addFavourites } = useContext(FavouriteContext)
  const [name, setName] = useState('')

  const fetchAuthors = useCallback(() => {
    fetch('https://poetrydb.org/author')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((result) => {
        if (result && Array.isArray(result.authors)) {
          setAuthors(result.authors)
        } else {
          throw new Error('Unexpected data format from API')
        }
      })
      .catch((error) => {
        console.error('Error fetching authors:', error)
      })
  }, [])

  const fetchPoemsByAuthor = useCallback(
    (author) => {
      fetch(`https://poetrydb.org/author/${author}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((result) => {
          if (result && Array.isArray(result)) {
            setPoemsByAuthor(result)
            setPoemByTitle([])
          } else {
            throw new Error('Unexpected data format from API')
          }
        })
        .catch((error) => {
          console.error(`Error fetching author ${selectedAuthor}:`, error)
        })
    },
    [selectedAuthor]
  )

  const fetchPoemByTitle = useCallback((title) => {
    fetch(`https://poetrydb.org/title/${title}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((result) => {
        if (result && Array.isArray(result)) {
          setPoemByTitle(result)
          setPoemsByAuthor([])
        } else {
          throw new Error('Unexpected data format from API')
        }
      })
      .catch((error) => {
        console.error(`Error fetching title:`, error)
      })
  }, [])

  useEffect(() => {
    fetchAuthors()
    if (authorName) {
      setSelectedAuthor(authorName)
      fetchPoemsByAuthor(authorName)
    } else {
      setSelectedAuthor('')
      setPoemsByAuthor([])
    }
  }, [authorName, fetchAuthors, fetchPoemsByAuthor])

  function handleChangedAuthor(event) {
    const author = event.target.value
    setSelectedAuthor(author)
    if (author) {
      navigate(`/authors/${author}`)
      fetchPoemsByAuthor(author)
    } else {
      navigate('/authors')
      setPoemsByAuthor([])
    }
  }
  return (
    <>
      <HeadingL>{props.header}</HeadingL>
      <BigWrapperDiv>
        <ListDiv>
          <h3>My favourite authors</h3>

          {favourites.length > 0 ? (
            <ListUl>
              {favourites.map((favourite) => (
                <li key={favourite}>{favourite}</li>
              ))}
            </ListUl>
          ) : (
            <p>You have no favourites yet. Add one below.</p>
          )}
          <InputDiv>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <button
              onClick={() => {
                addFavourites([name])
              }}
            >
              Add
            </button>
          </InputDiv>
        </ListDiv>
        <DivWrapper>
          <h2>Read poems from your favourite author</h2>
          <label>
            Author:{' '}
            <select onChange={handleChangedAuthor} value={selectedAuthor}>
              <option value="">Select an author</option>
              {authors &&
                authors.map((author) => <option key={author}>{author}</option>)}
            </select>
          </label>
          {authorName && (
            <PoemDiv>
              {authorName && (
                <HeadingM
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => fetchPoemsByAuthor(authorName)}
                >
                  {authorName}
                </HeadingM>
              )}
              {poemsByAuthor ? (
                poemsByAuthor.map((poems) => (
                  <HeadingS
                    onClick={() => fetchPoemByTitle(poems.title)}
                    key={poems.title}
                  >
                    {poems.title}
                  </HeadingS>
                ))
              ) : (
                <p>No poems found</p>
              )}
              {poemByTitle &&
                poemByTitle.map((poem) =>
                  poem.lines.map((line, index) => (
                    <Paragraph key={index}>{line}</Paragraph>
                  ))
                )}
            </PoemDiv>
          )}
        </DivWrapper>
      </BigWrapperDiv>
    </>
  )
}
Authors.propTypes = {
  header: PropTypes.string,
}
export default Authors
