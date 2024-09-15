import classes from "./errorMessage.module.scss";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={classes.errorMessageBlock} data-testid="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;
