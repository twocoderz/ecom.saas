import { RouterProvider } from "react-router-dom";
import { appRouter } from "./app/router";

/**
 * App root now delegates rendering to the route tree.
 */
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
