import "../styles/globals.css";
//INTRNAL IMPORT
import { Navbar,Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "@/context/NFTMarketplaceContext";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
    <Navbar />
    <Component {...pageProps} />
    <Footer/>
    </NFTMarketplaceProvider>  
  </div>
);

export default MyApp;
