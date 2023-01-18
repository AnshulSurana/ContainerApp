const inquirer = require("inquirer");
const replace = require("replace-in-file");

const updateDeploymentPathVariables = (projectName) => ({
  files: "./.deployments/**/*.yaml",
  from: "apps/credit-memo-ui",
  to: `apps/${projectName}`,
});

const updateSlackChannel = (slackName) => ({
  files: ["./.deployments/**/*.yaml", "./Jenkinsfile", "./.pipelinerc.yaml"],
  from: /credit-memo-alert/g,
  to: slackName,
});

const updateDefaultBranch = (defaultBranch) => ({
  files: ["./.pipelinerc.yaml", "./Jenkinsfile"],
  from: /master/g,
  to: !defaultBranch || /^\s*$/.test(defaultBranch) ? "master" : defaultBranch,
});

const updateEmail = (email) => ({
  files: "./.deployments/kubernetes/credit-memo-ui.yaml",
  from: /ui-platform@-place-.com/g,
  to: email,
});

const updateDeploymentManifest = (projectName) => ({
  files: [
    "./.deployments/kubernetes/credit-memo-ui.yaml",
    "./package.json",
    "./__e2e__/package.json",
    "./package-lock.json",
    "./__e2e__/package-lock.json",
    "./Jenkinsfile",
    "./docker-compose.yaml",
    "./.pipelinerc.yaml",
    "./sonar-project.properties",
    "./src/components/Root/index.tsx",
  ],
  from: /credit-memo-ui/g,
  to: projectName,
});

const updateDeploymentManifest2 = (projectName) => ({
  files: "./.deployments/kubernetes/credit-memo-ui.yaml",
  from: `prefix: '/micro-ui/credit-memo-ui`,
  to: `prefix: '/micro-ui/${projectName}`,
});

const updateDeploymentManifest3 = (projectName) => ({
  files: "./.deployments/kubernetes/credit-memo-ui.yaml",
  from: `pattern: '/micro-ui/credit-memo-ui`,
  to: `pattern: '/micro-ui/${projectName}`,
});

const updateWebpackConfig = (projectName) => ({
  files: "./webpack.config.js",
  from: `const APPNAME = "credit-memo-ui"`,
  to: `const APPNAME = "${projectName}"`,
});

const updateSmokeTest = () => ({
  files: [
    "./.deployments/kubernetes/manifests-shared.test.us-east-1/default/variables.yaml",
  ],
  from: "enableSmokeTest: true",
  to: "enableSmokeTest: false",
});

const updatePostSyncTest = (projectPath) => ({
  files: [
    "./.deployments/kubernetes/manifests-shared.test.us-east-1/default/variables.yaml",
  ],
  from: "enablePostSyncTest: true",
  to: "enablePostSyncTest: false",
});

const updateWebpackConfig2 = (projectPath) => ({
  files: [
    "./webpack.config.js",
    "./__e2e__/cypress/integration/smoke/smoke.spec.js",
    "./__e2e__/cypress/integration/e2e/lighthouse.spec.js",
  ],
  from: "/credit-memo-ui?",
  to: `${projectPath}?`,
});

const updateWebpackConfig3 = (projectName) => ({
  files: "./webpack.config.js",
  from: "micro-ui/credit-memo-ui",
  to: `micro-ui/${projectName}`,
});

const updateSmoke = (projectName) => ({
  files: ["./__e2e__/cypress/integration/smoke/smoke.spec.js"],
  from: "credit-memo-ui",
  to: projectName,
});

const updateLighthouse = (projectName) => ({
  files: ["./__e2e__/cypress/integration/e2e/lighthouse.spec.js"],
  from: "credit-memo-ui",
  to: projectName,
});

inquirer
  .prompt([
    {
      type: "input",
      name: "projectName",
      message:
        "Name of the project, same as the .git repo url (letters and dash, no spaces):",
      validate: (value) => {
        if (/^[aA-zZ0-9-_]+$/g.test(value)) {
          return true;
        }
        console.log("\n\n Invalid project name, use only letters and -. \n");
        return false;
      },
    },
    {
      type: "input",
      name: "projectPath",
      message: "Path of the project on the marketplace, example:",
      default: "/channel/marketplace",
    },
    {
      type: "input",
      name: "projectSlack",
      message: "Your team CICD slack Channel Name:",
      validate: (value) => {
        if (/^[aA-zZ0-9-_]+$/g.test(value)) {
          return true;
        }
        console.log("\n\n Invalid Slack Channel \n");
        return false;
      },
    },
    {
      type: "input",
      name: "projectDefaultBranch",
      message: "Your project's default branch ('master' by default):",
    },
    {
      type: "input",
      name: "projectEmail",
      message: "Your team's email :",
      validate: (value) => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(value)) {
          return true;
        }
        console.log("\n\n Invalid Email \n");
        return false;
      },
    },
  ])
  .then(
    async ({
      projectName,
      projectPath,
      projectSlack,
      projectDefaultBranch,
      projectEmail,
    }) => {
      const project = projectName.toLowerCase();
      const remoteEntryAppName = projectName.replace(/-/g, "_");
      try {
        await replace(updateDeploymentPathVariables(project));
        await replace(updateDeploymentManifest(project));
        await replace(updateDeploymentManifest2(project));
        await replace(updateDeploymentManifest3(project));

        await replace(updateSmokeTest());
        await replace(updatePostSyncTest());

        await replace(updateSlackChannel(projectSlack));
        await replace(updateDefaultBranch(projectDefaultBranch));
        await replace(updateEmail(projectEmail));

        await replace(updateSmoke(remoteEntryAppName));
        await replace(updateLighthouse(remoteEntryAppName));

        await replace(updateWebpackConfig(remoteEntryAppName));
        await replace(updateWebpackConfig2(projectPath));
        await replace(updateWebpackConfig3(project));

        console.log("Congratulation, your project is ready to go! \n");
        console.log(
          "Next you should update microContainer to register your new path! \n"
        );
        console.log(
          "Documentation on the next step: https://-place-.jira.com/wiki/spaces/EN/pages/3110961157/Creating+a+new+MicroUI#3.-Add-your-new-path-to-MicroContainer  \n"
        );
        console.log("Should look something like this: \n", {
          [remoteEntryAppName]: {
            title: "localized Title",
            pathPattern: projectPath,
            RemoteMicroUIurl: `/micro-ui/${project}/remoteEntry.js`,
            RemoteMicroUIName: remoteEntryAppName,
          },
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  )
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
