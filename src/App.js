import { CartContextProvider } from "./context/cart-context";
import Checkout from "./pages/checkout";

function App() {
  return (
    <CartContextProvider>
      <Checkout />
    </CartContextProvider>
  );
}

export default App;
