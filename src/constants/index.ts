import SplitFlap from "../components/SplitFlap/SplitFlap";
import MissingPage from "../components/MissingPage/MissingPage";
import Admin from '../components/Admin/Admin';

export const URLS = {
  INDEX: "/",
  ADMIN: "/admin",
  SPOTIFY: "/spotify",
};

export const ROUTES = [
  { name: "index", path: URLS.INDEX, exact: true, component: SplitFlap },
  { name: "admin", path: URLS.ADMIN, exact: true, component: Admin },
  {
    name: "missing",
    path: URLS.INDEX,
    exact: false,
    component: MissingPage,
  },
];
