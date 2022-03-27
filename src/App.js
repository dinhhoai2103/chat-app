import "./App.css";
import Login from "components/Login";
import ChatRoom from "components/ChatRoom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "Context/AuthContext";
import AppProvider from "Context/AppContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<ChatRoom />} path="/" />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
