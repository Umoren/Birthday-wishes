// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LandingPage from "./components/LandingPage.jsx";
import BirthdaysList from "./components/BirthdaysList.jsx";
import CreateBirthday from "./components/CreateBirthday.jsx";
import BirthdayPage from "./components/BirthdayPage.jsx";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/birthdays" element={<BirthdaysList />} />
          <Route path="/birthday/:birthdayId" element={<BirthdayPage />} />
          <Route path="/create" element={<CreateBirthday />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
