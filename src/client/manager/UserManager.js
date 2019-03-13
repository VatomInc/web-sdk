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
const jwtDecode = require('jwt-decode')

/* global window */

module.exports = class UserManager {
  constructor (UserApi, store) {
    this.UserApi = UserApi
    this.store = store
  }

  /**
   * An Alternate version of the register function
   * @param  {Object} registration An Object containing all the information to register a user.
   * @return {Promise<Object>} returns a success Object containing user specific information
   */
  register (registration) {
    return this.UserApi.register(registration)
  }

  /**
     * Allows the user to login to the platform
     * @param  {String} token     Email / Phone Number of the user
     * @param  {String} tokenType Description of the token : ie. "phone_number" or "email"
     * @param  {String} password  The password that the user has set
     * @return {Promise<Object>} returns a object containing the user that has logged in.
     */
  login (token, tokenType, password) {
    return this.UserApi.login(token, tokenType, password)
  }

  /**
     * Login with an Account without registering. A unique login string is generated by the server.
     * @param  {String} guestId A String generated by the server used to login.
     *                            A Guest account can be made into a registered account by patching
     * @return {Promise<Object>} A Object that contains  the guest user that was logged in.
     */
  loginGuest (guestId) {
    return this.UserApi.loginGuest(guestId)
  }

  /**
     * Logs out the currently logged in user.
     * @return {Promise<Object>} Logout success message
     */
  logout () {
    return this.UserApi.logout()
  }

  /**
   * Logs the user in via OAuth in a browser popup window.
   * NOTE: This is a private method, subject to change once more OAuth flows have been fully implemented on the backend.
   * @private
   * @returns {Promise<boolean>} `true` if login completed, or `false` if login was cancelled by the user.
   */
  loginOAuthPopup() {
    return this.UserApi.loginOAuthPopup()
  }

  /**
     * Gets information about the currently logged in user.
     * @return {Promise<Object>} Contains the users information such as ID, Avatar, Name etc.
     */
  getCurrentUser () {
    return this.UserApi.getCurrentUser()
  }

  /**
     * Returns a list of user tokens
     * @return {Promise<Object>} An Object containing a list of Email Address's and Phone Number's.
     */
  getCurrentUserTokens () {
    return this.UserApi.getUserTokens()
  }

  /**
     * Allows the uploading of a new avatar for the user.
     * @param  {FormData} formData Uploads the FormData containing the new avatar for the user
     * @return {Promise<Object>}   An Object containing a upload success message
     */
  uploadAvatar (formData) {
    return this.UserApi.uploadAvatar(formData)
  }

  /**
     * Allows the user to be edited
     * @param  {Object} payload A payload containg the fields to be changed for the user.
     * @return {Promise<Object>} returns a user Object containing the updated users info.
     */
  updateUser (payload) {
    return this.UserApi.updateUser(payload)
  }

  /**
     * Returns the Access Token
     * @return {Promise<Object>} Returns a Object containing the Access Token String.
     */
  getAccessToken () {
    return this.UserApi.getAccessToken()
  }

  /**
     * Automatically Encodes the Asset Provides URI's
     * @param {String} url The URL that needs to be encoded
     */
  encodeAssetProvider (url) {
    return this.UserApi.encodeAssetProvider(url)
  }

  /**
     * Sends a Verification Token to verify the token is valid
     * @param  {String} token      Phone Number / Email Address
     * @param  {String} token_type Description of the Token above ie. "phone_number" / "email"
     * @return {}   An Email / SMS will be sent to the token with a verification code.
     */
  sendTokenVerification (token, tokenType) {
    return this.UserApi.sendTokenVerification(token, tokenType)
  }

  getRefreshToken () {
    return this.UserApi.getRefreshToken()
  }

  setRefreshToken (token) {
    return this.UserApi.setRefreshToken(token)
  }

  /**
     * Verify a users Token
     * @param  {Object} verify An Object containing the token, token_type and the verification code.
     *           {"token" : "someone@blockv.org", "token_type" : "email", "verify_code" :  "00000" }
     * @return {Promise<Object>}  An Object containing the outcome of the verification of the token.
     */
  verifyUserToken (verify) {
    return this.UserApi.verifyUserToken(verify)
  }

  /**
     * Allows additional tokens to be added to the user
     * @param {Object} payload An Object containing the tokens that need to be added to the user.
     * @return {Promise<Object>}  An Object with the updated user profile.
     */
  addUserToken (payload) {
    return this.UserApi.addUserToken(payload)
  }

  /**
     * Sets the token to be the primary option
     * @param {[type]} tokenID id of the token that needs to be set as the defualt
     */
  setDefaultToken (tokenID) {
    return this.UserApi.setDefaultToken(tokenID)
  }

  /**
     * Removes a Token from the user's profile.
     * @param  {String} tokenId ID of the token that needs to be deleted
     * @return {Promise<Object>} A Success / Faile object with the outcome of the deletion.
     */
  deleteUserToken (tokenId) {
    return this.UserApi.deleteUserToken(tokenId)
  }

  getGuestToken () {
    return this.UserApi.getGuestToken()
  }

  /**
   * Sends a verification token to the token that was supplied.
   * NB! this will reset the current password.
   * @param {String} token   The Token that needs to be reset (Phone Number / Email Address)
   * @param {String} token_type Description of the Token to be reset
   */
  resetPassword (token, tokenType) {
    return this.UserApi.resetPassword(token, tokenType)
  }

  /**
     * Returns a Public User Profile
     * @param  {String} userID Public User ID
     * @return {Promise<Object>}  Returns a Public User Object
     */
  getPublicUserProfile (userID) {
    return this.UserApi.getPublicUserProfile(userID)
  }

  addRedeemable (payload) {
    return this.UserApi.addRedeemable(payload)
  }

  /**
     * Checked to see if the refresh token is valid
     * @return {Boolean} returns True / False if the refresh token is valid
     */
  get isLoggedIn () {
    // define our vars
    let decodedToken
    let nowDate
    let expirationTime
    const { refreshToken } = this.store
    // if no refreshToken
    if (!refreshToken) {
      return false
    }
    try {
      // decode token
      decodedToken = jwtDecode(refreshToken)
      expirationTime = (decodedToken.exp * 1000)
      nowDate = Date.now()
      // quick calc to determine if the token has expired
      return nowDate < (expirationTime - 30000)
    } catch (e) {
      // decoding fails
      return false
    }
  }
}
