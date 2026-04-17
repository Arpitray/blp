import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'pl6zt5cf',
    dataset: 'test'
  },
  deployment: {
    
    autoUpdates: true,
  }
})
