import { theme, ResetStyle } from '@styles';
import { ThemeProvider } from 'styled-components';
import { Router } from './navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <ThemeProvider theme={theme}>
      <ToastContainer limit={1} />
      <ResetStyle />
      <Router />
      {/* <div className="App">
        <header className="App-header">
          
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <link href='https://fonts.googleapis.com/css?family=Rubik Mono One' rel='stylesheet'></link>
          {/* <Button styleType="primary">
            Learn React
          </Button>
        </header>
      </div> */}
    </ThemeProvider>
    </PersistGate>
    </Provider>
  );
}

export default App;
