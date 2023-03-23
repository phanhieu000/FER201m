import { useContext } from "react"
import { NavLink, Link } from "react-router-dom"
import { MoviesContext } from "../../App"


function Left() {

    const { subCategories, selectCategory, setSelectCategory } = useContext(MoviesContext)

    return (
        <nav className="d-flex flex-column navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical" >
            <div className="container-fluid">
                {/* Toggler */}
                <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                {/* User menu (mobile) */}

                {/* Collapse */}
                <div className="text-center collapse navbar-collapse" id="sidebarCollapse">
                    {/* Navigation */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                <i className="bi bi-house" /> Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="analitycs">
                                <i className="bi bi-bar-chart" /> Analitycs
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="comments">
                                <i className="bi bi-chat" /> Comments
                                <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="categories">
                                <i className="bi bi-bookmarks" /> Categories
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="users">
                                <i className="bi bi-people" /> Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="movies">
                                <i className="bi bi-play-btn" /> Movies
                            </NavLink>
                        </li>
                    </ul>
                    {/* Divider */}
                    <hr className="navbar-divider my-2 opacity-20" />

                    <div className="mt-auto" />
                </div>
            </div>
        </nav >
    )
}

export default Left