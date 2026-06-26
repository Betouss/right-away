# Right Away — Overview

## What is it

Right Away is a community Node.js project generator. Users configure their project through a web interface and download a ready-to-run `.zip` file.

## Target audience

Node.js developers who want to start a configured project without wasting time on boilerplate.

## Main flow

1. User opens the site
2. Picks framework, language, module system and package manager
3. Fills in project metadata (name, version, author, license)
4. Adds dependencies from the catalog
5. Sees a live preview of the file structure
6. Clicks **Generate .zip** → downloads the ready project
7. Or clicks **Copy CLI** → copies the command to run locally

## Out of scope (MVP)

- CLI published as an npm package
- Authentication / user accounts
- Saved templates / history
- Frameworks beyond the initial 6

## Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Zip generation:** `archiver`
- **Monorepo:** pnpm workspaces
