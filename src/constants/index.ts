import SplitFlap from "../components/SplitFlap/SplitFlap";
import Admin from "../components/Admin/Admin";
import MissingPage from "../components/MissingPage/MissingPage";

export const URLS = {
  INDEX: "/",
  ADMIN: "/admin",
};

export const ROUTES = [
  { name: 'index', path: URLS.INDEX, exact: true, component: SplitFlap },
  { name: 'admin', path: URLS.ADMIN, exact: true, component: Admin },
  { name: 'missing', path: URLS.INDEX, exact: false, component: MissingPage },
];
