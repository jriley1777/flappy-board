import SplitFlap from "../components/SplitFlap/SplitFlap";
import MissingPage from "../components/MissingPage/MissingPage";
import Admin from '../components/Admin/Admin';
import Spotify from '../components/Spotify/Spotify';

export const URLS = {
  INDEX: "/",
  ADMIN: "/admin",
  SPOTIFY: "/spotify/redirect/",
};

export const ROUTES = [
  { name: "index", path: URLS.INDEX, exact: true, component: SplitFlap },
  { name: "admin", path: URLS.ADMIN, exact: true, component: Admin },
  { name: "spotify", path: URLS.SPOTIFY, exact: false, component: Spotify },
  {
    name: "missing",
    path: URLS.INDEX,
    exact: false,
    component: MissingPage,
  },
];
