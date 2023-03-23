import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { MoviesContext } from "../../App"

import './custom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Users() {
    const { accounts, setAccounts } = useContext(MoviesContext)

    const localAccounts = JSON.parse(localStorage.getItem('accounts'))

    const handleUpdate = (id, active) => {
        const confirm = window.confirm(`Are you sure ${active ? 'De-Active' : 'Active'} ?`)
        if (confirm) {
            const index = accounts.findIndex(e => e.id == id)

            accounts[index].active = !active

            const newAccounts = [...accounts]
            localStorage.setItem('accounts', JSON.stringify(newAccounts))

            setAccounts(newAccounts)
        }
    }

    const User = ({ id, userName, fullName, gender, primeum, role, active }) => {
        return (
            <tr >
                <td>{id}</td>
                <td>
                    <span className="text-heading font-semibold">{userName}</span>
                </td>
                <td>{fullName}</td>
                <td><i className={`fas fa-lg ${gender ? 'fa-mars text-primary' : 'fa-venus text-danger'}`}></i></td>

                <td>
                    <span className="badge badge-lg badge-dot ">
                        <i className={`${primeum ? 'bg-success' : 'bg-danger'} `} />
                    </span>
                </td>
                <td className="text-capitalize">{role}</td>
                <td>
                    <span className="badge badge-lg badge-dot ">
                        <i className={`${active ? 'bg-success' : 'bg-danger'} `} />
                    </span>
                </td>
                <td >
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover"
                        onClick={() => handleUpdate(id, active)} >
                            <i className="fas fa-sync-alt"></i>
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <main className="py-6 bg-surface-secondary" >
            <div className="container-fluid">
                {/* card  w-100 stats */}
                <div className="card  w-100 shadow border-0 mb-7">
                    <div className="card-header">
                        <h5 className="mb-0">User List</h5>
                    </div>
                    <div className="table-responsive">
                        <table id="movieTable" className="table table-hover table-striped table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Primeum</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Active</th>
                                    <th scope="col" >Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accounts.map((user, index) =>
                                        <User
                                            key={index}
                                            id={user.id}
                                            userName={user.userName}
                                            fullName={user.fullName}
                                            gender={user.gender}
                                            primeum={user.primeum}
                                            role={user.role}
                                            active={user.active}
                                        />
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* <div className="card-footer border-0 py-5">
                        <span className="text-muted text-sm">Showing 10 items out of 250 results found</span>
                    </div> */}
                </div>
            </div>
        </main >
    )
}

export default Users