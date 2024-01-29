import "./App.css";
import AppProvider from "@contexts/AppProvider";
import AppRouter from "@modules/AppRouter";
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
export default App;
