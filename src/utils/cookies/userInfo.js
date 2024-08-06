import Cookies from "js-cookie";

function saveUserInfoIntoCookies(userInfo, sessionID = null) {
  let far_into_the_future = 365 * 5;
  Cookies.set("nativeLanguage", userInfo.native_language, {
    expires: far_into_the_future,
  });
  Cookies.set("pronounceWords", true, {
    expires: far_into_the_future,
  });
  Cookies.set("translateWords", true, {
    expires: far_into_the_future,
  });
  Cookies.set("name", userInfo.name, { expires: far_into_the_future });
  if (sessionID) {
    console.log("saving also session ID");
    Cookies.set("sessionID", sessionID, { expires: far_into_the_future });
  }
}

function removeUserInfoFromCookies() {
  Cookies.remove("sessionID");
  Cookies.remove("nativeLanguage");
  Cookies.remove("name");
}

function getSessionFromCookies() {
  return Cookies.get("sessionID");
}

function getPronounceWordsFromCookies() {
  let val = Cookies.get("pronounceWords");
  return val === undefined ? true : val === "true";
}

function getTranslateWordsFromCookies() {
  let val = Cookies.get("translateWords");
  return val === undefined ? true : val === "true";
}

function setPronounceWordsIntoCookies(val) {
  Cookies.set("pronounceWords", val);
}

function setTranslateWordsIntoCookies(val) {
  Cookies.set("translateWords", val);
}

function setUserSession(val) {
  return Cookies.set("sessionID", val);
}

export {
  getPronounceWordsFromCookies,
  getTranslateWordsFromCookies,
  setPronounceWordsIntoCookies,
  setTranslateWordsIntoCookies,
  saveUserInfoIntoCookies,
  removeUserInfoFromCookies,
  getSessionFromCookies,
  setUserSession,
};
