import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { Home } from './pages/Home';
import { Issues } from './pages/Issues';
import { IssueDetail } from './pages/IssueDetail';
import { ShareBuilder } from './pages/ShareBuilder';
import { Practice } from './pages/Practice';
import { IntegrityCheck } from './pages/IntegrityCheck';
import { WeeklyPlan } from './pages/WeeklyPlan';
import { About } from './pages/About';
import { ToastProvider } from './components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="issues" element={<Issues />} />
            <Route path="issues/:slug" element={<IssueDetail />} />
            <Route path="share" element={<ShareBuilder />} />
            <Route path="practice" element={<Practice />} />
            <Route path="integrity" element={<IntegrityCheck />} />
            <Route path="weekly" element={<WeeklyPlan />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
