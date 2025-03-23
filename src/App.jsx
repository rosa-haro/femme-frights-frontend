import "./App.css";
import store from "./core/redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactPage from "./pages/contact/ContactPage";
import DetailsPage from "./pages/details/DetailsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SignupPage from "./pages/signup/SignupPage";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import WatchlistPage from "./pages/watchlist/WatchlistPage";
import SignInPage from "./pages/sign-in/SignInPage";
import BrowserLayout from "./layouts/BrowserLayout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/myprofile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route element={<BrowserLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
