import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Suspense } from 'react'
import React from 'react';
import Loader from './components/Loader';
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const CreateProduct = React.lazy(() => import("./pages/CreateProduct"));
const Landing = React.lazy(() => import("./pages/Landing"));
const UpdateCar = React.lazy(() => import("./pages/UpdateCar"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));


function App() {

  return (
    <>
    <BrowserRouter basename='/app'>
        <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/create-product' element={<CreateProduct />}/>
          <Route path='/update' element={<UpdateCar/>}/>
          <Route path='/car' element={<ProductDetail />}/>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
