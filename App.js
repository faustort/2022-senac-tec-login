import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { DefaultTheme, Provider } from "react-native-paper";
import { RootNavigation } from "./src/navigation";

export default function App() {
  // configure theme based on system
  const isDarkMode = useColorScheme() === "dark";
  const theme = {
    ...DefaultTheme,
    dark: isDarkMode,
    colors: {
      ...DefaultTheme.colors,
      primary: "#6200ee",
      accent: "#03dac6",
    },
  };

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}
