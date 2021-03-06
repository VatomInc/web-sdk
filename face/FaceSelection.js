//
//  BlockV AG. Copyright (c) 2018, all rights reserved.
//
//  Licensed under the BlockV SDK License (the "License"); you may not use this file or
//  the BlockV SDK except in compliance with the License accompanying it. Unless
//  required by applicable law or agreed to in writing, the BlockV SDK distributed under
//  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
//  ANY KIND, either express or implied. See the License for the specific language
//  governing permissions and limitations under the License.
//
/* eslint-disable no-use-before-define */

export default {

  // This display mode is used in the inventory view.
  Icon: vatom =>
    vatom.faces.find(v => v.properties.constraints.view_mode === 'icon' && v.properties.constraints.platform === 'web') ||
    vatom.faces.find(v => v.properties.constraints.view_mode === 'icon' && v.properties.constraints.platform === 'generic'),

  // This display mode is used when a user opens the vatom. It falls back to icon if no engaged face is found.
  Engaged: vatom =>
    vatom.faces.find(v => v.properties.constraints.view_mode === 'engaged' && v.properties.constraints.platform === 'web') ||
    vatom.faces.find(v => v.properties.constraints.view_mode === 'engaged' && v.properties.constraints.platform === 'generic') ||
    vatom.faces.find(v => v.properties.constraints.view_mode === 'icon' && v.properties.constraints.platform === 'web') ||
    vatom.faces.find(v => v.properties.constraints.view_mode === 'icon' && v.properties.constraints.platform === 'generic'),

  // This display mode is used when a vatom enters fullscreen mode
  Fullscreen: vatom =>
    vatom.faces.find(v => v.properties.constraints.view_mode === 'fullscreen' && v.properties.constraints.platform === 'web') ||
    vatom.faces.find(v => v.properties.constraints.view_mode === 'fullscreen' && v.properties.constraints.platform === 'generic'),

  // This display mode is used in the info card
  Card: vatom =>
    vatom.faces.find(v => v.properties.constraints.view_mode === 'card' && v.properties.constraints.platform === 'web') ||
    vatom.faces.find(v => v.properties.constraints.view_mode === 'card' && v.properties.constraints.platform === 'generic')

}
