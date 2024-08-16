export const NULLS = {
  editorNull: { ops: [{ insert: "\n" }] },
};

export const USER_PROFILE = {
  items: {
    username: {
      label: "pseudo : ",
      id: "username",
      properties: { disabled: true },
    },
    firstName: {
      label: "prénom : ",
      id: "firstName",
      properties: { disabled: true },
    },
    lastName: {
      label: "nom : ",
      id: "lastName",
      properties: { disabled: true },
    },
    defaultAcademicLevel: {
      label: "niveau academique : ",
      type: "menu",
      id: "menu",
      multipleFieldList: [
        { value: "na", text: "Choisissez un niveau" },
        { value: "MS", text: "collège" },
        { value: "HS", text: "lycée" },
        { value: "PC", text: "classe préparatoire" },
        { value: "LD", text: "license en fac" },
        { value: "MD", text: "master" },
        { value: "DD", text: "doctorat" },
      ],
      properties: { disabled: true },
    },
  },
  specialItems: {
    code: { label: "code : ", id: "code" },
    password: { label: "Mot de passe : ", type: "password", id: "password" },
    newPassword: {
      label: "Nouveau mot de passe : ",
      type: "password",
      id: "newPassword",
    },
    secureEmail: {
      label: "email : ",
      type: "email",
      id: "email",
      properties: { disabled: true },
    },
    email: { label: "email : ", type: "email", id: "email" },
  },
};

export const itemsForCreation = [
  ["email", { label: "Email : ", type: "email", id: "mail" }],
  ["username", { label: "Consissez un nom d'utilisateur : ", id: "username" }],
  [
    "academicLevel",
    {
      label: "A quel niveau étudiez-vous : ",
      type: "multipleradio",
      multipleFieldList: [
        { value: "MS", id: "MS", text: "collège" },
        { value: "HS", id: "HS", text: "lycée" },
        { value: "PC", id: "PC", text: "classe préparatoire" },
        { value: "LD", id: "LD", text: "license en fac" },
        { value: "MD", id: "MD", text: "master" },
        { value: "DD", id: "DD", text: "doctorat" },
      ],
    },
  ],
  [
    "password",
    {
      label: "Choisissez un mot de passe : ",
      type: "password",
      id: "password",
    },
  ],
];

export const GLOBAL = {
  domainName: "http://127.0.0.1:8000", // Nom de domaine et éventuellement numéro de port du site
  domain: "http://127.0.0.1:9000",
  extensionName: "/dist",
  mode: "no-cors",
  authorizeLocalReview: true,
  tokens: null,
};

export const PAGES = {
  connect: `${GLOBAL.domain}/connect.html`,
  notes: `${GLOBAL.domainName}/notes.html`,
  review: `${GLOBAL.domain}/review.html`,
  profile: `${GLOBAL.domainName}/profile.html`,
};

export const FLASHCARD_DEFAULTS = {
  getsetDefaultRequestedValue: {
    course: false,
    publicIdentifier: false,
    title: true,
    question: true,
    answer: true,
    lastMasteryLevel: true,
    lastRevisionTime: true,
    hidden: true,
  },
};

export const COURSE_DEFAULTS = {
  getsetDefaultRequestedValue: {
    user: false,
    publicIdentifier: false,
    name: true,
    content: true,
    levelStudied: true,
    subjectStudied: true,
    flashcards: true,
  },
};

export const USER_DEFAULTS = {
  getsetDefaultRequestedValue: {
    publicIdentifier: false,
    password: false,
    username: true,
    email: true,
    courses: true,
  },
};

const subjectsStudied = {
  Mathematics: "MA",
  Physics: "PH",
  Biology: "BI",
  English: "EN",
  Spanish: "SP",
  Frensh: "FR",
  History: "HI",
  Philosophy: "PI",
  default: "na",
};

const levelsStudied = {
  MiddleSchool: "MS",
  HighSchool: "HS",
  LicenseDegree: "LD",
  PreparatoryClass: "PC",
  MasterDegree: "MD",
  DoctorateDegree: "DD",
  default: "na",
};
