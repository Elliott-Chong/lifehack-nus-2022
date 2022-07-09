import "../styles/globals.css";
import "../styles/game.css";
import Context from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
