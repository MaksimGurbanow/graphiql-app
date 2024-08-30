import 'i18next';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: {
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
            };
        };
    }
}
