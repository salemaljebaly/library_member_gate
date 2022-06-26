import { useSelector } from "react-redux";
import MiniDrawer from "./components/drawer2";

import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/member/signIn";
function App() {
  // desctruct memebers from user state [ userSlice]
  const { member, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  );
  return (
    <>
      {member ? (
        <MiniDrawer />
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
