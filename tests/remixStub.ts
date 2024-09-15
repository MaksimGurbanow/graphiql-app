import { createRemixStub } from "@remix-run/testing";
import Welcome from "../app/components/welcome/Welcome";
import Rest, {
  loader as restLoader,
} from "../app/routes/($method).($requestUrl).($body)/route";
import GraphiQL, {
  loader as graphQLLoader,
} from "../app/routes/GRAPHQL.($requestUrl).($body)/route";

const RemixStub = createRemixStub([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/:method?/:url?/:body",
    Component: Rest,
    loader: restLoader,
  },
  {
    path: "/GRAPHQL",
    Component: GraphiQL,
    loader: graphQLLoader,
  },
  {
    path: "/login",
  },
]);

export default RemixStub;
