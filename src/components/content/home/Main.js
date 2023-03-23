import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { MoviesContext } from "../../../App"
import Login from "../../auth/Login"
import Register from "../../auth/Register"
import Header from "../../header/Header"
import Content from "../Content"
import Movie from "../details/Movie"
import Home from "./Home"



function Main() {

    const { token, setToken, setTokens, categories } = useContext(MoviesContext)

    return (
        <div className='container-fluid' style={{ minHeight: '761px' }}>
            <Header />

            <Routes >
                <Route path='/' element={<Home />} />
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
                            <Route key={index} path={`${category.url}/*`} element={<Content />}></Route>
                        )
                    })
                }

                <Route path="/movie/*">
                    <Route path=":id" element={<Movie />} />
                </Route>

            </Routes>

        </div>
    )
}

export default Main