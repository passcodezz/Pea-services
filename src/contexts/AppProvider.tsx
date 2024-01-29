/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Provider } from "react-redux";
import { store } from "@store/index";
import { Flowbite } from "flowbite-react";
import theme from "@config/theme";
import "@config/i18n";
const AppProvider = ({ children }: any) => {
  return (
    <Flowbite theme={{ theme: theme }}>
      <Provider store={store}>{children}</Provider>
    </Flowbite>
  );
};
export default AppProvider;
