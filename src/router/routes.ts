import { Page } from '@happysanta/router'

const ROOT_MAIN = 'root_main'
const ROOT_COLLECTION = 'root_collection'

const VIEW_MAIN = 'view_main'
const VIEW_OPTIONS = 'view_options'
const VIEW_COLLECTION = 'view_collection'

const PANEL_MAIN = 'panel_main'
const PANEL_GAME = 'panel_game'
const PANEL_OPTIONS = 'panel_options'
const PANEL_SETTINGS = 'panel_settings'
const PANEL_GAME_MODE = 'panel_game_mode'
const PANEL_COLLECTION = 'panel_collections'

const ALERT_HIDE_BASE_LEVELS = 'hide_base_levels'
const ALERT_EXIT_COLLECTION_GAME = 'exit_collection_game'
const ALERT_CHANGE_GAME_MODE = 'change_game_mode'
const ALERT_PREVIEW_COLLECTION = 'preview_collection'

const ACTION_SHEET_SELECT_COMPLEXITY = 'select_complexity'

export const ROOTS = {
   MAIN: ROOT_MAIN,
   COLLECTION: ROOT_COLLECTION,
}

export const VIEWS = {
   MAIN: VIEW_MAIN,
   OPTIONS: VIEW_OPTIONS,
   COLLECTION: VIEW_COLLECTION,
}

export const PANELS = {
   MAIN: PANEL_MAIN,
   OPTIONS: PANEL_OPTIONS,
   SETTINGS: PANEL_SETTINGS,
   GAME_MODE: PANEL_GAME_MODE,
   COLLECTION: PANEL_COLLECTION,
   GAME: PANEL_GAME,
}

export const ALERT_NAVS = {
   HIDE_BASE_LEVELS: ALERT_HIDE_BASE_LEVELS,
   EXIT_COLLECTION_GAME: ALERT_EXIT_COLLECTION_GAME,
   CHANGE_GAME_MODE: ALERT_CHANGE_GAME_MODE,
   PREVIEW_COLLECTION: ALERT_PREVIEW_COLLECTION,
}
export const ACTION_SHEET_NAVS = {
   SELECT_COMPLEXITY: ACTION_SHEET_SELECT_COMPLEXITY,
}

export const PAGE_MAIN = '/'
export const PAGE_COLLECTION = '/collection'
export const PAGE_OPTIONS = '/options'
export const PAGE_SETTINGS = '/settings'
export const PAGE_GAME_MODE = '/game-mode'
export const PAGE_GAME = '/game'

export const routes = {
   [PAGE_MAIN]: new Page(PANELS.MAIN, VIEWS.MAIN, ROOTS.MAIN),
   [PAGE_GAME]: new Page(PANELS.GAME, VIEWS.MAIN, ROOTS.MAIN),

   [PAGE_OPTIONS]: new Page(PANELS.OPTIONS, VIEWS.OPTIONS, ROOTS.MAIN),
   [PAGE_SETTINGS]: new Page(PANELS.SETTINGS, VIEWS.OPTIONS, ROOTS.MAIN),
   [PAGE_GAME_MODE]: new Page(PANELS.GAME_MODE, VIEWS.OPTIONS, ROOTS.MAIN),
   [PAGE_COLLECTION]: new Page(PANELS.COLLECTION, VIEWS.COLLECTION, ROOTS.COLLECTION),
}

export const PANELS_WITHOUT_TABBAR = [PANELS.OPTIONS, PANELS.SETTINGS, PANELS.GAME_MODE, PANELS.GAME]
