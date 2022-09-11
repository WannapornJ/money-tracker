import Layout from './components/layout';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { UserProvider } from './utilities/userContext';

function MyApp({ Component, pageProps }) {
  return (
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
  );
}

export default MyApp;
