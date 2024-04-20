import {Route, Routes} from "react-router-dom";
import RepositoryList from "../RepositoryList/RepositoryList.jsx";
import UserPage from "../UserPage/UserPage.jsx";
import {Form} from "../Form/Form.jsx";

export const Content = () =>{

    return(
        <div className="content container">

            <Routes>
                <Route path="/profile" element={<Form />}/>
                <Route path="/repositories" element={<RepositoryList />}/>
                <Route path="/users" element={<UserPage />}/>
            </Routes>

        </div>
    )
}