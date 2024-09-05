import { Button } from "@mui/material";
import "./notFound/notFound.scss";
import { useNavigate } from "@remix-run/react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <h1>404. Page not found</h1>
      <p>The page you requested doesn&apos;t exist</p>
      <div>
        <Button
          variant="outlined"
          style={{ width: "150px" }}
          onClick={() => navigate("/")}
        >
          Go to main
        </Button>
      </div>
    </div>
  );
}
