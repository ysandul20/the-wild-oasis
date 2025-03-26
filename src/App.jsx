import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import BookingDetails from "./pages/BookingDetailsPage";
import BookingCheckinPage from "./pages/BookingCheckinPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ThemeContextProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

function App() {
   return (
      <ThemeContextProvider>
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyles />
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<AppLayout />}>
                     <Route element={<ProtectedRoute />}>
                        <Route
                           index
                           element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        {/* <Route element={<ProtectedRoute />}> */}
                        <Route path="bookings" element={<Bookings />} />
                        <Route
                           path="bookings/:id"
                           element={<BookingDetails />}
                        />
                        <Route
                           path="checkin/:id"
                           element={<BookingCheckinPage />}
                        />
                        <Route path="cabins" element={<Cabins />} />
                        <Route path="account" element={<Account />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="users" element={<Users />} />
                     </Route>
                  </Route>
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<PageNotFound />} />
               </Routes>
            </BrowserRouter>
            <Toaster
               position="top-center"
               reverseOrder={false}
               gutter={8}
               containerStyle={{ margin: "8px" }}
               toastOptions={{
                  duration: 2000,
                  removeDelay: 1000,
                  style: {
                     background: "#363636",
                     color: "#fff",
                  },

                  success: {
                     style: {
                        border: "2px solid #31b443",
                     },
                  },
                  error: {
                     duration: 3000,
                     style: {
                        border: "2px solid #cd3939",
                     },
                  },
               }}
            />
         </QueryClientProvider>
      </ThemeContextProvider>
   );
}

export default App;
