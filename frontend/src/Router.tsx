import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthPage } from "./Pages/AuthPage";
import { ChatPage } from "./Pages/ChatPage";
import { SettingsPage } from "./Pages/SettingsPage";
import { Layout } from "./Pages/Layout/Layout";

const Router = () => {
  const location = useLocation();

  return (
    <>
      {/* {location.pathname !== "/" && <Layout />} */}
      <Routes>
        <Route path={"/"} element={<AuthPage />} />
        <Route path="/chat" element={<Layout />}>
          <Route path={"/chat"} element={<ChatPage />} />
        </Route>
        <Route path={"/settings"} element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Router;
