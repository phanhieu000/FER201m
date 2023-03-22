import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Header from './components/header/Header';
import Register from './components/auth/Register';
import Home from './components/content/home/Home.js';
import Content from './components/content/Content';

import { createContext, useEffect, useState } from 'react';
import Detail from './components/content/Detail';

/** Data **/
import Movies from './components/data/movies.json';
import Accounts from './components/data/accounts.json'
import Comments from './components/data/comments.json'
import Categories from './components/data/categories.json'
import Movie from './components/content/details/Movie';
/** Data **/

export const MoviesContext = createContext();

function setTokens(userToken) {
	sessionStorage.setItem('token', JSON.stringify(userToken))
}

function getToken() {
	const tokenString = sessionStorage.getItem('token')
	const userToken = JSON.parse(tokenString);

	return userToken
}

const removeToken = () => {
	sessionStorage.removeItem('token')
}

const getCategory = (datas = [{id: 0, title: '', url: ''}], id) => {
	return datas.find(e => e.id == id).title
}



function App() {

	let location = useLocation();

	const [movies, setMovies] = useState([])

	const [categories, setCategories] = useState([])

	const [accounts, setAccounts] = useState([])

	const [subCategories, setSubCategories] = useState([...new Set(movies.map((movie) => movie.subCategory))])

	const [currentPath, setCurrentPath] = useState('');

	const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')))

	// const [doSomethingDone, setDoSomethingDone] = useState(false)


	useEffect(() => {
		setCurrentPath(location.pathname.split('/')[1])
	}, [location])

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(Movies))
		const localMovies = JSON.parse(localStorage.getItem('movies'))
		setMovies(localMovies)
	}, [])

	useEffect(() => {
		// localStorage.setItem('accounts', JSON.stringify(Accounts))
		const localAccounts = JSON.parse(localStorage.getItem('accounts'))
		setAccounts(localAccounts)
	}, [])

	// useEffect(() => {
	// 	setCategories([...new Set(movies.map((movie) => movie.subCategory))])
	// }, [movies])

	// useEffect(() => {
		// localStorage.setItem('comments', JSON.stringify(Comments))
	// 	const localComments = JSON.parse(localStorage.getItem('comments'))
	// 	setComments(localComments)
	// }, [])

	useEffect(() => {
		// localStorage.setItem('categories', JSON.stringify(Categories))
		const localCategories = JSON.parse(localStorage.getItem('categories'))
		setCategories(localCategories)
	}, [])

	// console.log(categories)

	const [token, setToken] = useState(getToken())

	return (
		<MoviesContext.Provider value={{
			movies, setMovies,
			currentPath, setCurrentPath, subCategories,
			token, setToken, removeToken,
			accounts, setAccounts,
			categories,
			comments, setComments,
			getCategory
		}}>
			<div className='container-fluid ' style={{ minHeight: '761px', padding: '0 3rem' }}>
				<Header />

				<Routes >
					<Route path='/' element={<Home />}></Route>
					{
						token == null && (
							<>
								<Route path='/login' element={<Login setToken={setToken} setTokens={setTokens} />} />
								<Route path='/register' element={<Register />} />
							</>
						)

					}

					{
						categories.map((category, index) => {
							return (
								<Route key={index} path={`${category.url}/*`} element={<Content />}>
									<Route path=':subcategory' element={<Content />} />
								</Route>
							)
						})
					}

					<Route path="/movie/*">
						<Route path=":id" element={<Movie />} />

					</Route>

				</Routes>

			</div>
		</MoviesContext.Provider>

	);
}

export default App;
