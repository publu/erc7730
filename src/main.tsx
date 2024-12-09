import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LandingPage } from './LandingPage';
import App from './App';
import './index.css';

function Main() {
  const [showLanding, setShowLanding] = useState(true);

  return showLanding ? (
    <LandingPage onGetStarted={() => setShowLanding(false)} />
  ) : (
    <App onGoHome={() => setShowLanding(true)} />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);