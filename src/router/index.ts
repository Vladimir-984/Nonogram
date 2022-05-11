import { startGlobalRouter } from '@happysanta/router'
import { routes } from './routes'

export const router = startGlobalRouter(routes, { enableLogging: true })
