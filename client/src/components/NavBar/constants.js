import React from 'react'
import { CLIENT_ROUTES } from '../../config/routes'
import { Image } from 'semantic-ui-react'
import BitBoardLogo from '../../assets/images/BitBoard.png'

export const routeInfo = [
  {key: "code", title: "Code", path: CLIENT_ROUTES.CODEPAGE},
  {key: "workspace", title: "Workspace", path: CLIENT_ROUTES.WORKSPACEPAGE},
  {key: "learn", title: "Learn", path: CLIENT_ROUTES.LEARNPAGE}, 
  {key: "network", title: "Network", path: CLIENT_ROUTES.LANDINGPAGE}, // Still not defined
  {key: "level-up", title: "Level Up", path: CLIENT_ROUTES.PERSONAPAGE},
  {key: "sign-in", title: "Sign In", path: CLIENT_ROUTES.LANDINGPAGE}
]

export const logoRouteInfo = {
  key: "icon", 
  title: <Image size="small" src={BitBoardLogo}/>, 
  path: CLIENT_ROUTES.HOMEPAGE
}