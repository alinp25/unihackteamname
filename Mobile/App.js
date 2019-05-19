import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import configureStore from "./src/store/configureStore";
import PollutionScreen from './src/screens/Pollution/Pollution';
import PollutionPlaceDetailsScreen from './src/screens/Pollution/PollutedPlaceDetails';
import DirectionsMenuScreen from './src/screens/Directions/DirectionsMenu';
import DirectionsScreen from './src/screens/Directions/Directions';

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  "awesome-places.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.SharePlaceScreen",
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.FindPlaceScreen",
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.PlaceDetailScreen",
  () => PlaceDetailScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.DirectionsMenuScreen",
  () => DirectionsMenuScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.SideDrawer",
  () => SideDrawer
);
Navigation.registerComponent(
  "awesome-places.PollutionScreen",
  () => PollutionScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.PollutionPlaceDetailsScreen",
  () => PollutionPlaceDetailsScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.DirectionsScreen",
  () => DirectionsScreen,
  store,
  Provider
);
// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: 'Login'
  }
});
