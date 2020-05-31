import { 
    vidFormConfig,
    bookFormConfig,
    articleFormConfig
  } from './forms/newResource/config'

export const menuTabInfo = [
    {componentKey: "videos", icon: "video", title: "Videos", config: vidFormConfig},
    {componentKey: "books", icon: "book", title: "Books", config: bookFormConfig},
    {componentKey: "articles", icon: "pencil", title: "Articles", config: articleFormConfig}
]