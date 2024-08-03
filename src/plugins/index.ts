import type { App } from 'vue'
import pinia from '../stores'

export function registerPlugins(app: App) {
    app.use(pinia)
}
