import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { makeStyles } from '@mui/styles';
import Home from './components/Home';

import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Page1 from './components/pages/page1';




const useStyles = makeStyles(() => ({
  App:{
    
   
  }
}))

function App(props) {

  const classess = useStyles(props)
  //  const [username, setUsername]= useState("")

  // useEffect(() => {
  //   auth.onAuthStateChanged(user=>{
  //     if(user)
  //     {
  //       setUsername(user.displayName)
  //     }
  //     else{
  //       setUsername("")
  //     }
  //   })
  // })

  return (
    <BrowserRouter>
       <div className={classess.App}>
        
        <Routes>
        <Route path='/' Component={Home} exact ></Route>
        <Route path='/page1' element={<Page1 />} exact ></Route>
       

        </Routes>
        

       </div>

    </BrowserRouter>
  );
}

export default App;
