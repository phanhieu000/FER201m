import Left from "./Left"
import Right from "./Right"

import './dashboard.css'
import { useContext } from "react"
import { MoviesContext } from "../../App"
import { useNavigate } from "react-router-dom"

function Dashboard() {

    const { token, setToken } = useContext(MoviesContext)

    const navigate = useNavigate()

    if (token == null)
        navigate('/login')
    else if (token.role != 'Admin')
        navigate('/')
    else
        return (
            <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <Left />
                <Right />
            </div>

        )





}

export default Dashboard