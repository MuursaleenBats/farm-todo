import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Login } from './components/Auth/Login';
import Register from './components/Auth/Register';
import {AuthConsumer, AuthProvider} from './context/JWTAuthContext';
import { Flex, Spinner } from '@chakra-ui/react';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <AuthConsumer>
          {
            (auth) => !auth.isInitialized ? (
              <Flex 
                height={"100vh"}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Spinner 
                  thickness='4px'
                  speed = '0.65s'
                  emptyColor='green.200'
                  color="green.500"
                  size={'xl'}  
                />
              </Flex>
            ) : (
              <Routes>
                <Route path="/login" element= {<Login />}/>
                <Route path="/register" element= {<Register />}/>
                <Route path="/" element= {<h1>Home</h1>}/>
                <Route path="*" element= {<Navigate to="/" />}/>
              </Routes>
            )
          }         
        </AuthConsumer>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
