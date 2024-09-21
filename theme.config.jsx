export default {
  logo: <span>{process.env.PROJECT_NAME} Documentation Hub</span>,
  project: {
    link: process.env.PROJECT_REPO
  },
  docsRepositoryBase: process.env.PROJECT_REPO,
  footer: {
    component: () => (
      <></>
    ),
  },
}
