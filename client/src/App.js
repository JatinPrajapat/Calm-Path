import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


//apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//CSS
import './components/CSS/App.css';

//routes
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import SingleQuiz from './pages/Result';
import Legal from './pages/Legal';
import HelpLineCard from './components/Elements/HelpLineCard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage';
import QuizSelectForm from './components/QuizSelectForm';
import Therapy from './pages/Therapy';
import MentalAnalysis from './pages/MentalAnalysis';
import MindGames from './pages/MindGames';
import GameEngine from './pages/GameEngine';
import MentalTest from './pages/MentalTest';
import Sidebar from './components/Sidebar/Sidebar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2EC4B6', // Teal accent
    },
    background: {
      default: '#000000',
      paper: '#09090b',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000',
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <CssBaseline />
          <div>
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

            <main 
              className={`sb-page-offset ${collapsed ? 'collapsed' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 0,
                overflowX: 'hidden'
              }}
            >
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="login" element={<Login />} />
                  <Route path="quiz/:id" element={<Quiz />} />
                  <Route path="singlequiz/:id" element={<SingleQuiz />} />
                  <Route path="quizselect" element={<MentalAnalysis />} />
                  <Route path="mental-analysis" element={<MentalAnalysis />} />
                  <Route path="test/:testId" element={<MentalTest />} />
                  <Route path="mind-games" element={<MindGames />} />
                  <Route path="games/memory" element={<GameEngine gameId="memory" />} />
                  <Route path="games/focus" element={<GameEngine gameId="focus" />} />
                  <Route path="games/pattern" element={<GameEngine gameId="pattern" />} />
                  <Route path="games/zen" element={<GameEngine gameId="zen" />} />
                  <Route path="games/:gameId" element={<GameEngine />} />
                  <Route path="legal" element={<Legal />} />
                  <Route path='helpCard' element={<HelpLineCard />} />
                  <Route path='therapy' element={<Therapy />} />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};