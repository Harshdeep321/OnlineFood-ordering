import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer'
import { useEffect } from 'react';
import {setDataProduct} from "./redux/productSlice"
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const productData =useSelector((state)=>state.product)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
        const resData = await res.json();
        console.log(resData);
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  console.log(productData)
  return (
    <div >
    <Header/>
       <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
       </main>
    <Footer/>
    </div>
  );
}

export default App;
