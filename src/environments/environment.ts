// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
	  apiKey: "AIzaSyC8LA04dftElVDkFSKDptBYXIF1okMb2n0", 
	  authDomain: "explainable-agent.firebaseapp.com", 
	  databaseURL: "https://explainable-agent.firebaseio.com/",
	  projectId: "explainable-agent",
   }
};
