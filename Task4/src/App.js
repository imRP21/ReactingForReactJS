import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Page components — each one is a "view" rendered based on the URL.
import Home from './pages/Home';
import Todo from './pages/Todo';

// In React MPA, App.js becomes the Router Shell - it holds:
// 1. <BrowserRouter>: enables routing.
// 2. <nav> with <Link>: the navigation bar (shared navigation - visible on all pages).
// 3. <Routes> + <Route>: defines which component to render for each URL path (mapping of URLs to components).
// The page components (Home, Todo, etc.) are the content that swaps based on the URL. The shell (nav, header, footer) remains unchanged across pages.
function App() {
  return (
    // BrowserRouter: Wraps your app to enable routing. Must be at the top.
    <BrowserRouter>
      <div className="app-container">
        <h1 className="app-title">⚡ My React App</h1>

        {/* NAVIGATION BAR */}
        {/* <Link> replaces <a> tags - it changes the URL WITHOUT a full page reload. */}
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/todo" className="nav-link">Todo</Link>
        </nav>

        {/* ROUTE DEFINITIONS */}
        {/* <Routes> looks at the current URL and renders the matching <Route>. */}
        {/* Only ONE route matches at a time. */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            {/* Catch-all: any unknown URL shows this. Try adding a NotFound page later! */}
            <Route path="*" element={<p>404 — Page not found 🤷</p>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;