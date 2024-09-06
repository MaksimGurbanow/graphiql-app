const PasswordStrengthMeter = (props: { password: string }) => {
  const { password } = props;
  const atLeastOneUppercase = /[A-Z]/g;
  const atLeastOneLowercase = /[a-z]/g;
  const atLeastOneNumeric = /[0-9]/g;
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
  const eightCharsOrMore = /.{8,}/g;

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value
  ).length;
  return (
    <div>
      <p className="password-strength-heading">Password strength</p>
      <div className="password-strength"></div>
      <style>
        {`

          .password-strength {
            height: 0.3rem;
            background-color: lightgrey;
            border-radius: 3px;
            margin: .5rem 0;

          }

          .password-strength::before {
            content: "";
            background-color: ${
              ["red", "orange", "#03a2cc", "#03a2cc", "#0ce052"][
                passwordStrength - 1
              ] || ""
            };
            height: 100%;
            width: ${(passwordStrength / 5) * 100}%;
            display: block;
            border-radius: 3px;
            transition: width 0.2s;
          }
          .password-strength-text {
          height: 20px;
          font-size: 12px;
          }
          .password-strength-heading {
          width: 100%;
          font-size: 14px;
          text-align: left;
          margin: 0;
          font-family:'Roboto', 'Helvetica', 'Arial', sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default PasswordStrengthMeter;
