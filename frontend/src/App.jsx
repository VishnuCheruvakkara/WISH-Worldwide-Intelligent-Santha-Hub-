import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './routes/RouterConfig';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from './components/ui/spinner/Spinner';
import useCSRF from './hooks/useCSRF';
import NavigationRegistrar from './services/navigation/NavigationRegistrar';
import CustomToaster from './components/ui/CustomToaster';

function App() {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  // initialize CSRF token on app load
  useCSRF();

  React.useEffect(() => {
    // Show the magical spinner for at least 2 seconds to "wow" the user
    // and ensure all initial checks (like CSRF) are completing
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <BrowserRouter>
            <NavigationRegistrar />
            <CustomToaster />
            <RouterConfig />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

