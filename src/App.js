import Routes from './routes';

import { Provider } from 'react-redux';
import store from './store/index';

import './styles/index.scss';
import 'antd/dist/antd.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const persistor = persistStore(store);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
