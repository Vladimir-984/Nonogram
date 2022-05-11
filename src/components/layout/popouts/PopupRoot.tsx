import React from 'react'
import { ActionSheetPuzzle } from './ActionSheets/ActionSheetPuzzle'
import { PopoutWrapper } from './PopoutWrapper'
import { AlertHideBaseLevels } from './Alerts/AlertHideBaseLevels'
import { AlertExitCollectionGame } from './Alerts/AlertExitCollectionGame'
import { AlertChangeGameMode } from './Alerts/AlertChangeGameMode'
import { AlertPreviewCollection } from './Alerts/AlertPreviewCollection'
import { ACTION_SHEET_NAVS, ALERT_NAVS } from 'router/routes'
import { ActionSheetSelectComplexity } from './ActionSheets/ActionSheetSelectComplexity'
export const PopupRoot: React.FC = () => {
   return (
      <PopoutWrapper>
         <ActionSheetPuzzle nav='popup' />
         <ActionSheetSelectComplexity nav={ACTION_SHEET_NAVS.SELECT_COMPLEXITY} />
         <AlertHideBaseLevels nav={ALERT_NAVS.HIDE_BASE_LEVELS} />
         <AlertExitCollectionGame nav={ALERT_NAVS.EXIT_COLLECTION_GAME} />
         <AlertChangeGameMode nav={ALERT_NAVS.CHANGE_GAME_MODE} />
         <AlertPreviewCollection nav={ALERT_NAVS.PREVIEW_COLLECTION} />
      </PopoutWrapper>
   )
}
