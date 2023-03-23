import { Route, Routes } from "react-router-dom"
import Categories from "./Categories"
import Movies from "./Movies"
import Users from "./Users"
import CategoryAction from "./action/CategoryAction"
import MovieAction from "./action/MovieAction"



function Right() {
    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            {/* Header */}
            <header className="bg-surface-primary border-bottom pt-6">
                <div className="container-fluid">
                    <div className="mb-npx my-2">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                {/* Title */}
                                <h1 className="h2 mb-0 ls-tight">Application</h1>
                            </div>
                            {/* Actions */}
                            <div className="col-sm-6 col-12 text-sm-end">
                                <div className="mx-n1">
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header >
            {/* Main */}
            <Routes>
                <Route path='analitycs' element={<Movies />} />
                <Route path='comments' element={<Movies />} />
                <Route path='categories/*'>
                    <Route path="" element={<Categories />} />
                    <Route path='update/'>
                        <Route path=':id' element={<CategoryAction type='update' />} />
                    </Route>
                    <Route path='add' element={<CategoryAction type='add' />} />
                </Route>
                <Route path='users' element={<Users />} />
                <Route path='movies/*'>
                    <Route path="" element={<Movies />} />
                    <Route path='update/'>
                        <Route path=':id' element={<MovieAction type='update' />} />
                    </Route>
                    <Route path='add' element={<MovieAction type='add' />} />
                </Route>
            </Routes>

        </div >
    )
}

export default Right