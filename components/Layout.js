import Head from 'next/head';
import Navbar from './Navbar';
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => (
    <>
      <Head>
        <title>Nancy's Inventory</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=ABeeZee&family=IBM+Plex+Mono&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css"></link>
        <script src="https://kit.fontawesome.com/dcfabf23b2.js" crossorigin="anonymous"></script>
      </Head>
      <Navbar />
      {children}
      <footer className={styles.footer}>
        <a
          href="https://nancysrestaurant.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/output-onlinepngtools.png" alt="Nancy's Logo" className={styles.logo} />
        </a>
      </footer>
    </>
)

export default Layout;