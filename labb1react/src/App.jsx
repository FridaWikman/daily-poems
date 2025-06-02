import Home from './components/Home'
import Authors from './components/Authors'
// import HeaderWrapper from './components/HeaderWrapper'
import Subscribe from './components/Subscribe'
import { Ul, Li } from './components/Styled'
import logoDailyPoems from './assets/logoDailyPoems.png'
// import FavouriteContext from './components/FavouriteContext'
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import { FavouriteProvider } from './components/FavouriteContext'

function App() {
  const router = createHashRouter([
    {
      children: [
        {
          element: <Home header="Poems" />,
          path: '/',
        },
        {
          element: <Authors header="Authors" />,
          path: '/authors/:authorName?',
        },
        {
          element: <Subscribe header="Subscription" />,
          path: '/subscribe',
        },
      ],
      element: (
        <>
          <nav>
            <img src={logoDailyPoems} alt="DailyPoems logo" />
            <Ul>
              <Li>
                <Link to="/">Home</Link>
              </Li>
              <Li>
                <Link to="/authors">Authors</Link>
              </Li>
              <Li>
                <Link to="/subscribe">Subscribe</Link>
              </Li>
            </Ul>
          </nav>
          <main>
            <Outlet />
          </main>
        </>
      ),
    },
  ])

  return (
    <>
      <FavouriteProvider>
        <RouterProvider router={router} />
      </FavouriteProvider>
    </>
  )
}

export default App
