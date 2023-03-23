import { useContext } from "react"
import { NavLink, Link } from "react-router-dom"
import { MoviesContext } from "../../App"


function LeftContent() {

    const { subCategories, selectCategory, setSelectCategory } = useContext(MoviesContext)

    return (
        <div className="col-2 pl-0 position-absolutes d-none d-lg-block " style={{
            height: '761px',
        }} >
            <div className="col-2 p-0 list-group position-fixed bg-dark"
                style={{
                    height: '100%',
                    // overflow: 'scroll',
                    borderRadius: 'unset',
                    left: 0
                }}
            >
                <NavLink
                    
                    to='/'
                    className={`list-group-item list-group-item-action list-group-item-light disabled text-center
                        ${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}`}
                >
                    Category
                </NavLink>
                {
                    subCategories.map((subCategories, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={`${subCategories}`}
                                className={`list-group-item list-group-item-action list-group-item-light 
                        ${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}`}
                            >
                                {subCategories}
                            </NavLink>
                        )
                    })
                }

            </div>
        </div >
    )
}

export default LeftContent