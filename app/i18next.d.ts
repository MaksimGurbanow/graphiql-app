import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: {
        welcome: {
          reactGroup: string;
          prepareTogether: string;
          teamLead: string;
          frontendDeveloper: string;
          studentInfo: string;
          githubProfile: string;
          maksimName: string;
          egorName: string;
          dmitryName: string;
          maksimBio: string;
          egorBio: string;
          dmitryBio: string;
          restClient: string;
          graphiQlClient: string;
          history: string;
          welcome: string;
          welcomeBack: string;
        };
        header: {
          signOut: string;
          signIn: string;
          signUp: string;
        };
        form: {
          password: string;
          signIn: string;
          signUp: string;
          dontHaveAccount: string;
          haveAccount: string;
          signInHeading: string;
          signUpHeading: string;
        };
        history: {
          history: string;
        };
      };
    };
  }
}
