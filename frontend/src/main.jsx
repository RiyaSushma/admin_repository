import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import store from './Store/store.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import Protected from './utils/Authentication/AuthLayout.jsx';
import App from './App.jsx';
import { createBrowserRouter, Navigate, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Login, SignUp } from './Pages';
import { Dash, Learning, CourseManage, EditLearningArea, UserManage, Settings, Profile, BatchManage } from './Pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <SignUp/>
  },
  { path: "settings", element: <Settings/> },
  {
    path: "/",
    // element: <Protected><App/></Protected>
    element: <App/>,
    children: [
      { path: "dashboard", element: <Dash/> },
      { path: "learning", element: <Learning/> },
      { path: "editlearning", element: <EditLearningArea /> },
      { path: "usermanage", element: <UserManage /> },
      { path: "coursemanage", element: <CourseManage /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile /> },
      { path: "batchmanage", element: <BatchManage /> },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
