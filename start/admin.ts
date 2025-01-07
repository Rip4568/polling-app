import AdminJS from 'adminjs'
import * as AdminJSExpress from '@adminjs/express'

const adminJs = new AdminJS({
  resources: [
    {
      resource: Poll,
      options: {
        navigation: {
          name: 'Content',
          icon: 'Poll',
        },
      },
    },
    {
      resource: Option,
      options: {
        navigation: {
          name: 'Content',
          icon: 'Option',
        },
      },
    },
    {
      resource: Image,
      options: {
        navigation: {
          name: 'Content',
          icon: 'Image',
        },
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Polling Party Admin',
    logo: false,
    softwareBrothers: false,
  },
})

const router = AdminJSExpress.buildRouter(adminJs)

export { adminJs, router }
