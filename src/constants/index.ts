import SplitFlap from "../components/SplitFlap/SplitFlap";
import MissingPage from "../components/MissingPage/MissingPage";

export const URLS = {
  INDEX: "/",
};

export const ROUTES = [
  { name: 'index', path: URLS.INDEX, exact: true, component: SplitFlap },
  { name: 'missing', path: URLS.INDEX, exact: false, component: MissingPage },
];
