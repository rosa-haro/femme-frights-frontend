import './App.css'
import store from './core/redux/store/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import ContactPage from './pages/contact/ContactPage'
import DetailsPage from './pages/details/DetailsPage'
import LoginPage from './pages/login/LoginPage'
import ProfilePage from './pages/profile/ProfilePage'
import SignupPage from './pages/signup/SignupPage'
import HomePage from './pages/home/HomePage'
import MainLayout from './layouts/MainLayout'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/myprofile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
    </Provider>
  )
}

export default App
