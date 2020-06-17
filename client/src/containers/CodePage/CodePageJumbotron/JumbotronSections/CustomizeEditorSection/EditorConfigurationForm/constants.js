import _ from 'lodash'
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-dreamweaver";


export const fontSizeOptions = _.range(8, 25).map(num => ({
  key: num, value: num, text: num
}))

export const tabSizeOptions = _.range(2, 9, 2).map(num => ({
  key: num, value: num, text: num
}))

// Leaving this in case I want to make the imports dynamic to save memory
const THEME_URL_PREFIX = ''

export const colorThemes = [
  {key: "0", value: "0", text: "Dark - Dracula Theme", url: THEME_URL_PREFIX + "dracula"},
  {key: "1", value: "1", text: "Dark - Monokai", url: THEME_URL_PREFIX + "monokai"},
  {key: "2", value: "2", text: "Dark - Solarized Dark", url: THEME_URL_PREFIX + "solarized_dark"},
  {key: "3", value: "3", text: "Dark - Tomorrow Night", url: THEME_URL_PREFIX + "tomorrow_night"},
  {key: "4", value: "4", text: "Dark - Tomorrow Night Blue", url: THEME_URL_PREFIX + "tomorrow_night_blue"},
  {key: "5", value: "5", text: "Dark - Tomorrow Night Eighties", url: THEME_URL_PREFIX + "tomorrow_night_eighties"},
  {key: "6", value: "6", text: "Dark - Clouds Midnight", url: THEME_URL_PREFIX + "clouds_midnight"},
  {key: "7", value: "7", text: "Dark - Cobalt", url: THEME_URL_PREFIX + "cobalt"},
  {key: "8", value: "8", text: "Dark - Vibrant Ink", url: THEME_URL_PREFIX + "vibrant_ink"},
  {key: "9", value: "9", text: "Light - X Code", url: THEME_URL_PREFIX + "xcode"},
  {key: "10", value: "10", text: "Light - Dreamweaver", url: THEME_URL_PREFIX + "dreamweaver"},
  {key: "11", value: "11", text: "Light - Github", url: THEME_URL_PREFIX + "github"},
  {key: "12", value: "12", text: "Light - Solarized Light", url: THEME_URL_PREFIX + "solarized_light"}
] 

export const SAMPLE_CODE = `
package main

import (
\t"fmt"
\t"log"
\t"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
\tfmt.Fprint(w, "Hello Port 8080")
}

func main() {
\thttp.HandleFunc("/", handler)
\tlog.Fatal(http.ListenAndServe(":8080", nil))
}
`