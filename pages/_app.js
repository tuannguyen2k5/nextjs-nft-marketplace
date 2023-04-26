import "../styles/globals.css";
//INTRNAL IMPORT
import { Navbar,Footer } from "../components/componentsindex";
const MyApp = ({ Component, pageProps }) => (
  <div>
    <Navbar />
    <Component {...pageProps} />
    <Footer/>
  </div>
);

export default MyApp;
