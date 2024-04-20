import './index.css'
import {Header} from "./components/Header/Header.jsx";
import {Sidebar} from "./components/Sidebar/Sidebar.jsx";
import {Content} from "./components/Content/Content.jsx";
import {Profile} from "./components/Profile/Profile.jsx";
import {useSelector} from "react-redux";
import {selectSearchData} from "./redux/slices/search.js";
import Footer from "./components/Footer/Footer.jsx";



const App = () => {
    const searchResult = useSelector(selectSearchData)
    return (
   <div className='wrapper'>
       <div className='app container'>
           <Header/>
           <Sidebar/>
           <Content/>
           <Profile/>
           <Footer/>

       </div>

   </div>
    );
};

export default App;
