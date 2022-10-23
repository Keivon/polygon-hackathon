import Home from './pages/Home';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      
   },[isConnected]);

   console.log(userInfo)

    return (
        <>
            <Routes>
                <Route path="/" element={<Home
                 setIsConnected={setIsConnected}
                 setUserInfo={setUserInfo}
                 isConnected={isConnected}
                 />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            setIsConnected={setIsConnected}
                            setUserInfo={setUserInfo}
                            isConnected={isConnected}
                            userInfo={userInfo}
                        />
                    }></Route>
            </Routes>
        </>
    );
}

export default App;
