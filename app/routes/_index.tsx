import type { MetaFunction } from "@remix-run/node";
import Welcome from "../components/welcome/Welcome";

export const meta: MetaFunction = () => {
  return [
    { title: "GraphQl/Rest client" },
    { name: "description", content: "Welcome to GrpahQl/Rest application!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Welcome />
    </div>
  );
}
