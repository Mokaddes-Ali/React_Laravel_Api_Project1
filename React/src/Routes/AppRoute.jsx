import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { ColorProvider } from "../context/ColorContext";
import Dashboard from "../Pages/Dashboard";
import Settings from "../Pages/Settings";
import SettingsProfile from "../Pages/SettingsProfile";
import SettingsAccount from "../Pages/SettingsAccount";
import Users from "../Pages/Users";
import UsersList from "../Pages/UsersList";
import UsersRoles from "../Pages/UsersRoles";
import Courses from "../Pages/Courses";
import CoursesList from "../Pages/CoursesList";
import CoursesCategories from "../Pages/CoursesCategories";
import Products from "../Pages/Products";
import ProductsList from "../Pages/ProductsList";
import ProductsCategories from "../Pages/ProductsCategories";
import More from "../Pages/More";
import Reports from "../Pages/Reports";
import MoreSettings from "../Pages/MoreSettings";
import Layout from "../Layout/Layout ";
import Login from "../Components/Login";
import RequireAuth from "../Components/RequireAuth";

function AppRoute() {
  return (
    <>
      <ColorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
        

              <Route
                path="admin/dashboard"
                element={
                  <RequireAuth>
                  <Layout>
                    <Dashboard />
                  </Layout>
                  </RequireAuth>
                }
              />

              <Route
                path="/settings"
                element={
                  <Layout>
                    <Settings />
                  </Layout>
                }
              />

              <Route
                path="/settings/profile"
                element={
                  <Layout>
                    <SettingsProfile />
                  </Layout>
                }
              />

              <Route
                path="/settings/account"
                element={
                  <Layout>
                    <SettingsAccount />
                  </Layout>
                }
              />

              <Route
                path="/users"
                element={
                  <Layout>
                    <Users />
                  </Layout>
                }
              />

              <Route
                path="/users/list"
                element={
                  <Layout>
                    <UsersList />
                  </Layout>
                }
              />

              <Route
                path="/users/roles"
                element={
                  <Layout>
                    <UsersRoles />
                  </Layout>
                }
              />
              <Route
                path="/courses"
                element={
                  <Layout>
                    <Courses />
                  </Layout>
                }
              />

              <Route
                path="/courses/list"
                element={
                  <Layout>
                    <CoursesList />
                  </Layout>
                }
              />

              <Route
                path="/courses/categories"
                element={
                  <Layout>
                    <CoursesCategories />
                  </Layout>
                }
              />

              <Route
                path="/products"
                element={
                  <Layout>
                    <Products />
                  </Layout>
                }
              />

              <Route
                path="/products/list"
                element={
                  <Layout>
                    <ProductsList />
                  </Layout>
                }
              />

              <Route
                path="/products/categories"
                element={
                  <Layout>
                    <ProductsCategories />
                  </Layout>
                }
              />

              <Route
                path="/more"
                element={
                  <Layout>
                    <More />
                  </Layout>
                }
              />

              <Route
                path="/more/reports"
                element={
                  <Layout>
                    <Reports />
                  </Layout>
                }
              />

              <Route
                path="/more/settings"
                element={
                  <Layout>
                    <MoreSettings />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
      </ColorProvider>
    </>
  );
}

export default AppRoute;
