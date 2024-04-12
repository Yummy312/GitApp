import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from './axios'
import { useForm } from "react-hook-form"

const CLIENT_ID = "Iv1.080a19091369fa5d"
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`;

function App() {
  const [response, setResponse] = useState('')
  const [codeParam, setCodeParam] = useState('')
  const [rerender, setRerender] = useState(false)
  const [userData, setUserData] = useState({})
  const isAuth = Boolean(localStorage.getItem("accessToken"))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: 'Вася пупкин',
      company: 'Bawaer',
      location: 'Bishkek'
    },
    mode: 'onChange'
  })


  React.useEffect(()=>{
    // http://localhost:5173/?code=e974a344d528bc991075
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    setCodeParam(urlParams.get("code"))
    console.log(codeParam)
  }, [])

  

  if (codeParam && localStorage.getItem('accessToken') === null) {
    const getAccessToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/getAccessToken?code=" + codeParam);
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          setRerender(!rerender);
        }
      } catch (err) {
        console.error('Ошибка при получении токена доступа:', err.message);
      }
    };
  
    // Вызываем функцию getAccessToken, чтобы отправить запрос на получение токена доступа
    getAccessToken();
  }

  
  const removeAccessToken = ()=>{
    localStorage.removeItem('accessToken')
    setRerender(!rerender)
  }
  
  const loginByGithub = ()=>{
    window.location.assign(GITHUB_AUTH_URL)
  }

  const getUserData = async()=>{
    const{data} = await axios.get('http://localhost:5000/getUserData', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    })
    setUserData(data)
    console.log(data)
  }
  const onSubmit = async (userData) => {
    try {
      
      const{data} = await axios.get('http://localhost:5000/updateUserData', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
      })

  
      console.log(data);
    } catch (err) {
      console.log(err)
      alert("Произошла ошибка при обновлении данных");
    }
  }
  
  

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          {isAuth ? 
          <>
            <h1>We have in access token</h1>
            <button onClick={removeAccessToken}>
              Logout
            </button>
            <h3>Get Data from GitHub API</h3>
            <button onClick={getUserData}>Get Data</button>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div>
                  <input {...register("bio")} placeholder='описание профиля'/>
                </div>

                {/* include validation with required or other standard HTML validation rules */}
                <div>
                  <input {...register("company")} placeholder='компания'/>
                </div>
                
                <div>
                  <input {...register("location")} placeholder='местоположение'/>
                </div>
                <br></br>
                <button type='submit'>отправить</button>

              </form>
            
            {Object.keys(userData).length !== 0 ?
            <>
              <h4>Hey there {userData.login} </h4>
              <img src={userData.avatar_url} alt="" />
            </>
            :
            <>
              
            </>
            }
          </>
          : 
          <>
            <h2>User is not logged in</h2>
            <button onClick={loginByGithub}>
              Login with GitHub
            </button>
          </>
          }
          
        </header>
      </div>
    </>
  )
}

export default App



// React.useEffect(() => {
//   // declare the data fetching function
//   const fetchData = async () => {
//     const {data} = await axios.get('/test');
//     setResponse(data.message)
//   }

//   // call the function
//   fetchData()
//     // make sure to catch any error
//     .catch(console.error);
// }, [])