import { Route, Routes } from "react-router";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";

import Bookmarks from "./pages/blogs/Bookmarks";
import Blog from "./pages/blogs/Blog";
import Blogs from "./pages/blogs/Blogs";
import BlogList from "./pages/admin/blogs/List";
import BlogEdit from "./pages/admin/blogs/Edit";
import EmailVerification from "./pages/auth/EmailVerification";
import ErrorPage from "./pages/Error";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/auth/Register";
import UserEdit from "./pages/admin/users/Edit";
import UserList from "./pages/admin/users/List";
import VerifyForgetPassword from "./pages/auth/VerifyForgetPassword";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route
            path="forget-password/verify"
            element={<VerifyForgetPassword />}
          />
          <Route path="email-verify" element={<EmailVerification />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <BlogList />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs/:slug"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <BlogEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute roles={["admin"]}>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="users/:id"
            element={
              <PrivateRoute roles={["admin"]}>
                <UserEdit />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage link="/admin" />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:slug" element={<Blog />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
