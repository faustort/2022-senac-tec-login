import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { DefaultTheme, Provider } from "react-native-paper";
import { darkColors, lightColors } from "./src/config/theme";
import { RootNavigation } from "./src/navigation";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";
  const theme = {
    ...DefaultTheme,
    colors: isDarkMode ? darkColors : lightColors,
  };

  return (
    <Provider theme={theme}>
      <NavigationContainer theme={theme}>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}
