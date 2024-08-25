import { Button } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { collection } from "firebase/firestore";
import { db } from "lib/firebase.config";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    {},
  ];
};

export default function Index() {
  console.log(collection(db, "request_history"));

  return (
    <div>
      {<Button>Hello</Button>}
      {/* <Button>Hello</Button> */}
    </div>
  );
}
