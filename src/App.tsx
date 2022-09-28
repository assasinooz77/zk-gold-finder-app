import { WalletProvider } from './contexts/wallet_context';
import Pages from './pages';

const App = () => (
  <WalletProvider>
    <Pages />
  </WalletProvider>
);

export default App;
