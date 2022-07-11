import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/header';
import RecentArticles from './components/Articles/RecentArticles';
import About from './components/About/About';
import AdminArticles from './components/Admin/AdminArticles';
import AdminArticleDetail from './components/Admin/AdminArticleDetail';
import AdminArticleUpdate from './components/Admin/AdminArticleUpdate';
import AdminNewArticle from './components/Admin/AdminNewArticle';
import { LoginContext } from './context/login';
import Login from './components/Login/Login';

function App() {
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    loginContext?.signIn();
  }, [loginContext]);

  return (
    <>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<RecentArticles />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-my-articles" element={<AdminArticles />} />
          <Route path="/recent-articles/:id" element={<AdminArticleDetail />} />
          <Route
            path="/admin-article-update"
            element={<AdminArticleUpdate />}
          />
          <Route path="/admin-new-article" element={<AdminNewArticle />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
