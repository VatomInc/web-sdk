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

import jwtDecode from 'jwt-decode'

export default class Store {
  constructor (prefix, customToken) {
    this.prefix = prefix
    this.customToken = customToken
  }

  get server () {
    return this.serverAddress
  }

  set server (address) {
    this.serverAddress = address
  }

  set userID (userid) {
    // this.USERID = userid
  }

  get userID () {
    try {
      let dCode = jwtDecode(this.customToken ? this.token : this.refreshToken)
      return dCode.user_id || dCode.sub
    } catch (err) {
      console.warn("Decoding failed!")
    }

  }

  get appID () {
    return this.APPID
  }

  set appID (appid) {
    this.APPID = appid
  }

  get websocketAddress () {
    return this.wssocketAddress
  }

  set websocketAddress (websocAddress) {
    this.wssocketAddress = websocAddress
  }

  set token (token) {
    this.accessToken = token
  }

  get token () {
    if (this.customToken) {
      return this.customToken()
    }
    return this.accessToken
  }

  set refreshToken (refresh) {
    this.token = ''
    this.privateRefreshToken = refresh
    if (typeof localStorage !== 'undefined') {
      // eslint-disable-next-line no-undef
      localStorage.setItem(`${this.prefix}_refresh`, refresh)
    }
  }

  get refreshToken () {
    if (this.privateRefreshToken) {
      return this.privateRefreshToken
    }
    if (typeof localStorage !== 'undefined') {
      // eslint-disable-next-line no-undef
      const rT = localStorage.getItem(`${this.prefix}_refresh`)
      if (rT) {
        return rT
      }
    }
    return null
  }

  set assetProvider (provider) {
    this.privateAssetProvider = provider
    if (typeof localStorage !== 'undefined') {
      // eslint-disable-next-line no-undef
      localStorage.setItem(`${this.prefix}_asset_provider`, JSON.stringify(provider))
    }
  }

  get assetProvider () {
    if (this.privateAssetProvider) {
      return this.privateAssetProvider
    }
    if (typeof localStorage !== 'undefined') {
      // eslint-disable-next-line no-undef
      try {
        return JSON.parse(localStorage.getItem(`${this.prefix}_asset_provider`))
      } catch (err) {
        console.warn('Unable to parse JSON payload ', err)
      }
    }
    return null
  }
}
