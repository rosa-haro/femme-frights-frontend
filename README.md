
# 🎬 FemmeFrights – Frontend

A React-based application for **FemmeFrights**, a project about horror movies directed by women. Users can browse, search, and interact with a movie database, manage their own profiles, and build favorites and watchlists, all with navigation powered by React Router.

---

## 🌟 Features

- 🏠 Home, Favorites & Watchlist views
- 🔍 Search by titll & Sort by title or year (they can be combined)
- 💾 User Sign Up, Login, and Profile Editing
- 🖼️ Profile picture upload and update with preview
- ❤️ Add/remove movies as Favorites to Watchlist
- 📬 Contact form using EmailJS integration
- 🔐 JWT-based Auth
- ✨ Responsive & styled with custom CSS

---

## 🔧 Tech Stack

- **React** with functional components & hooks
- **Redux** for global state management
- **React Router** for navigation
- **Vite** for bundling and dev server
- **EmailJS** for client-side messaging
- **TMDb** for poster images
- **Fetch** for API calls

---

## 🗂️ Project Structure

```
src/
├── components/         # Reusable UI & logic
├── core/               # Redux store, services, hooks
├── layouts/            # App-level and page-level layouts
├── pages/              # Route-specific views (home, profile, contact...)
├── App.jsx             # Main routing logic
├── main.jsx            # Vite entry point
public/                 # Static assets (e.g. icons, logo)
```

---

## 📌 Pages & Routes

| Path            | Page                     | Access       |
|-----------------|--------------------------|--------------|
| `/`             | HomePage                 | Public       |
| `/favorites`    | FavoritesPage            | Logged users |
| `/watchlist`    | WatchlistPage            | Logged users |
| `/details`      | DetailsPage              | Public       |
| `/signup`       | SignupPage               | Public       |
| `/signin`       | SignInPage               | Public       |
| `/myprofile`    | ProfilePage              | Logged users |
| `/contact`      | ContactPage              | Public       |

---

## 🧪 Demo Credentials

Use this demo account to explore the app:

**Regular User**
```
username: exampleuser
password: 123456789
```

---

## 🔧 Setup & Run

1. **Clone the repository**
```bash
git clone https://github.com/rosa-haro/femme-frights-frontend.git
cd femme-frights-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file** and set your values:
```bash
VITE_API_URL=http://localhost:3500
VITE_TMDB_API_KEY=c53aad4c6400e1a6cfc810346741763e
VITE_EMAILJS_SERVICE_ID=service_szj6eq4
VITE_EMAILJS_TEMPLATE_ID=template_26cgkyc
VITE_EMAILJS_PUBLIC_KEY=UxJyUeaJauVYlV3X9
```

4. **Start the development server**
```bash
npm run dev
```

App will be available at: `http://localhost:5173`

---

## 💡 Notes

- TMDb is used for poster display. You'll need a TMDb API key if customizing the image source.
- EmailJS integration allows users to submit messages through the contact form.
- The project uses Redux for authentication persistence and global state.

---

## 🔗 Related Projects

- [Backend Repository](https://github.com/rosa-haro/femme-frights-backend)

---

## 👩‍💻 Author

**Rosa Haro** – [GitHub Profile](https://github.com/rosa-haro)

