# Nx Workspace

This document describes how to work with this Nx Workspace. From now on Nx is used as primary runner for all commands in repository. Main purpose of Nx is to organize apps in repo, but it also helps with versioning and caching. This repository folows Nx [**Package-based**](https://nx.dev/concepts/integrated-vs-package-based) monorepo. That means every app has its own `package.json` file with its private dependencies. Shared dependencies are listed in root `package.json`. To install private dependency `cd` into app folder and use `yarn add`. This approach gives us an option to have multiple version of one dependency and also bit of order in dependencies.

## Development

To develop locally you first need to install all depencencies listed in root `package.json` file. Each app in `apps/` folder has its own `project.json` file. This file defines `targets`, those are commands that can be invoked in that app

```bash

nx run <app_name>:<command_name> --additionale-options-passed-to-command

```

Or there are some usefull scripts defined in `package.json`, those can also be ran with `nx <script_name>`

## Create app

We can create any type of app with help of [nx plugins](https://nx.dev/plugin-registry). At first this plugin has to
be installed, ideally as _dev dependency_. For example we can create React app with following command

```
nx g @nx/react:app apps/<app_name>
```

## Create library

Libraries are similar to apps but their main purpose is to be shared across multiple apps. Or at least be separated from apps

```
nx g @nx/react:lib libs/<lib_name>
```

More can be found at [nx.dev](https://nx.dev/getting-started/intro)
