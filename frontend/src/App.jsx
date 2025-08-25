import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Settings from "./pages/settings";
import AccountPage from "./pages/account-page";
import useStore from "./store";
import { setAuthToken } from "./lib/apiCall";
import { Toaster } from "sonner";
function App() {

  //check if the user is registered or not
  const RootLayout = () => {
    //accesses the entire store (state) — including values (theme, user) and methods (setTheme, setCredentials, signOut).
    const {user} = useStore((state)=> state);
    setAuthToken(user?.token || "")
    console.log(user);
    return !user ? (
      <Navigate to="sign-in" replace={true}/>
    ) : (
      <>
        {/* Navbar */}
        {/* The minimum height of this div will be full screen height minus 100px. */}
        <div className="min-h-[calc(h-screen-100px)]">
          <Outlet/>
        </div>
      </>
    );
  };
  return (
    <main>
      <div className="w-full min-h-screen  bg-gray-100 dark:bg-slate-900">
        {/* px-6 md:px-20 */}
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>

      <Toaster richColors position="top-center"/>
    </main>
  );
}

export default App;
