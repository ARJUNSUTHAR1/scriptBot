import './App.css'
import { Route, Routes } from "react-router-dom";
import Loader from './pages/Admin/components/Loader';
import AdminDashboard from './pages/Admin/Dashboard';
import AllUsers from './pages/Admin/Users';
import Training from './pages/Admin/Training';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Auth/Login';
import Organisation from './pages/Admin/Organisation';
import ChatStructure from './pages/Chat/ChatStructure';
import { globalLoaderAtom } from './store/globalLoader/globalLoaderAtom';
import PrivateRoute from './Private/PrivateRoute';
import { useRecoilValue } from 'recoil';
import Setting from './pages/Admin/Setting';


const routesConfig = [
   { path : "/" , element : <AdminDashboard /> }, 
    { path : "/admin/users" , element : <AllUsers />} ,
    { path : "/admin/training" , element : <Training />}, 
    {  path : "/admin/organisation",  element : <Organisation />},
    {  path : "/admin/chat",  element : <ChatStructure />},      
    {  path : "/admin/setting",  element : <Setting />},      
];

function generateRoutes(config) {
  return config.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        // <DashBoardLayout>
          <PrivateRoute>
            {route.element}
          </PrivateRoute>
        // </DashBoardLayout>
      }
    />
  ));
}

function App() {

  // const mode = useRecoilValue(darkmodeAtom);
  const isLoading = useRecoilValue(globalLoaderAtom);

  return (
    // <div className={main-dashboard ${mode && 'dark'}}>
    <div>
      <Toaster />
      {isLoading && <>
        <Loader />

      </>}
      {/* <Sidenav /> */}
        <Routes>
          {generateRoutes(routesConfig)}
          <Route
            path='/login'
            element={<Login/>}
          />
          {/* <Route
            path='/verify'
            element={<InvoicePreview />}
          /> */}
        </Routes>
    </div>
  )
}

export default App


// login -> email,role=0 ->mongo role=1