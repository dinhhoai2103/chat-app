import "./App.css";
import Login from "components/Login";
import ChatRoom from "components/ChatRoom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ChatRoom />} path="/" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
