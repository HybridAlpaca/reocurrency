/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@paypal/paypal-js/dist/esm/paypal-js.js":
/*!**************************************************************!*\
  !*** ./node_modules/@paypal/paypal-js/dist/esm/paypal-js.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadCustomScript\": () => (/* binding */ loadCustomScript),\n/* harmony export */   \"loadScript\": () => (/* binding */ loadScript),\n/* harmony export */   \"version\": () => (/* binding */ version)\n/* harmony export */ });\n/*!\n * paypal-js v4.0.6 (2021-07-09T14:53:44.672Z)\n * Copyright 2020-present, PayPal, Inc. All rights reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nfunction findScript(url, attributes) {\n  var currentScript = document.querySelector(\"script[src=\\\"\" + url + \"\\\"]\");\n  if (currentScript === null) return null;\n  var nextScript = createScriptElement(url, attributes); // ignore the data-uid-auto attribute that gets auto-assigned to every script tag\n\n  var currentScriptDataset = Object.assign({}, currentScript.dataset);\n  delete currentScriptDataset.uidAuto; // check if the new script has the same number of data attributes\n\n  if (Object.keys(currentScriptDataset).length !== Object.keys(nextScript.dataset).length) {\n    return null;\n  }\n\n  var isExactMatch = true; // check if the data attribute values are the same\n\n  Object.keys(currentScriptDataset).forEach(function (key) {\n    if (currentScriptDataset[key] !== nextScript.dataset[key]) {\n      isExactMatch = false;\n    }\n  });\n  return isExactMatch ? currentScript : null;\n}\nfunction insertScriptElement(_a) {\n  var url = _a.url,\n      attributes = _a.attributes,\n      onSuccess = _a.onSuccess,\n      onError = _a.onError;\n  var newScript = createScriptElement(url, attributes);\n  newScript.onerror = onError;\n  newScript.onload = onSuccess;\n  document.head.insertBefore(newScript, document.head.firstElementChild);\n}\nfunction processOptions(options) {\n  var sdkBaseURL = \"https://www.paypal.com/sdk/js\";\n\n  if (options.sdkBaseURL) {\n    sdkBaseURL = options.sdkBaseURL;\n    delete options.sdkBaseURL;\n  }\n\n  var processedMerchantIDAttributes = processMerchantID(options[\"merchant-id\"], options[\"data-merchant-id\"]);\n  var newOptions = Object.assign({}, options, processedMerchantIDAttributes);\n\n  var _a = Object.keys(newOptions).filter(function (key) {\n    return typeof newOptions[key] !== \"undefined\" && newOptions[key] !== null && newOptions[key] !== \"\";\n  }).reduce(function (accumulator, key) {\n    var value = newOptions[key].toString();\n\n    if (key.substring(0, 5) === \"data-\") {\n      accumulator.dataAttributes[key] = value;\n    } else {\n      accumulator.queryParams[key] = value;\n    }\n\n    return accumulator;\n  }, {\n    queryParams: {},\n    dataAttributes: {}\n  }),\n      queryParams = _a.queryParams,\n      dataAttributes = _a.dataAttributes;\n\n  return {\n    url: sdkBaseURL + \"?\" + objectToQueryString(queryParams),\n    dataAttributes: dataAttributes\n  };\n}\nfunction objectToQueryString(params) {\n  var queryString = \"\";\n  Object.keys(params).forEach(function (key) {\n    if (queryString.length !== 0) queryString += \"&\";\n    queryString += key + \"=\" + params[key];\n  });\n  return queryString;\n}\n\nfunction createScriptElement(url, attributes) {\n  if (attributes === void 0) {\n    attributes = {};\n  }\n\n  var newScript = document.createElement(\"script\");\n  newScript.src = url;\n  Object.keys(attributes).forEach(function (key) {\n    newScript.setAttribute(key, attributes[key]);\n\n    if (key === \"data-csp-nonce\") {\n      newScript.setAttribute(\"nonce\", attributes[\"data-csp-nonce\"]);\n    }\n  });\n  return newScript;\n}\n\nfunction processMerchantID(merchantID, dataMerchantID) {\n  var newMerchantID = \"\";\n  var newDataMerchantID = \"\";\n\n  if (Array.isArray(merchantID)) {\n    if (merchantID.length > 1) {\n      newMerchantID = \"*\";\n      newDataMerchantID = merchantID.toString();\n    } else {\n      newMerchantID = merchantID.toString();\n    }\n  } else if (typeof merchantID === \"string\" && merchantID.length > 0) {\n    newMerchantID = merchantID;\n  } else if (typeof dataMerchantID === \"string\" && dataMerchantID.length > 0) {\n    newMerchantID = \"*\";\n    newDataMerchantID = dataMerchantID;\n  }\n\n  return {\n    \"merchant-id\": newMerchantID,\n    \"data-merchant-id\": newDataMerchantID\n  };\n}\n\n/**\n * Load the Paypal JS SDK script asynchronously.\n *\n * @param {Object} options - used to configure query parameters and data attributes for the JS SDK.\n * @param {PromiseConstructor} [PromisePonyfill=window.Promise] - optional Promise Constructor ponyfill.\n * @return {Promise<Object>} paypalObject - reference to the global window PayPal object.\n */\n\nfunction loadScript(options, PromisePonyfill) {\n  if (PromisePonyfill === void 0) {\n    PromisePonyfill = getDefaultPromiseImplementation();\n  }\n\n  validateArguments(options, PromisePonyfill); // resolve with null when running in Node\n\n  if (typeof window === \"undefined\") return PromisePonyfill.resolve(null);\n\n  var _a = processOptions(options),\n      url = _a.url,\n      dataAttributes = _a.dataAttributes;\n\n  var namespace = dataAttributes[\"data-namespace\"] || \"paypal\";\n  var existingWindowNamespace = getPayPalWindowNamespace(namespace); // resolve with the existing global paypal namespace when a script with the same params already exists\n\n  if (findScript(url, dataAttributes) && existingWindowNamespace) {\n    return PromisePonyfill.resolve(existingWindowNamespace);\n  }\n\n  return loadCustomScript({\n    url: url,\n    attributes: dataAttributes\n  }, PromisePonyfill).then(function () {\n    var newWindowNamespace = getPayPalWindowNamespace(namespace);\n\n    if (newWindowNamespace) {\n      return newWindowNamespace;\n    }\n\n    throw new Error(\"The window.\" + namespace + \" global variable is not available.\");\n  });\n}\n/**\n * Load a custom script asynchronously.\n *\n * @param {Object} options - used to set the script url and attributes.\n * @param {PromiseConstructor} [PromisePonyfill=window.Promise] - optional Promise Constructor ponyfill.\n * @return {Promise<void>} returns a promise to indicate if the script was successfully loaded.\n */\n\nfunction loadCustomScript(options, PromisePonyfill) {\n  if (PromisePonyfill === void 0) {\n    PromisePonyfill = getDefaultPromiseImplementation();\n  }\n\n  validateArguments(options, PromisePonyfill);\n  var url = options.url,\n      attributes = options.attributes;\n\n  if (typeof url !== \"string\" || url.length === 0) {\n    throw new Error(\"Invalid url.\");\n  }\n\n  if (typeof attributes !== \"undefined\" && typeof attributes !== \"object\") {\n    throw new Error(\"Expected attributes to be an object.\");\n  }\n\n  return new PromisePonyfill(function (resolve, reject) {\n    // resolve with undefined when running in Node\n    if (typeof window === \"undefined\") return resolve();\n    insertScriptElement({\n      url: url,\n      attributes: attributes,\n      onSuccess: function onSuccess() {\n        return resolve();\n      },\n      onError: function onError() {\n        return reject(new Error(\"The script \\\"\" + url + \"\\\" failed to load.\"));\n      }\n    });\n  });\n}\n\nfunction getDefaultPromiseImplementation() {\n  if (typeof Promise === \"undefined\") {\n    throw new Error(\"Promise is undefined. To resolve the issue, use a Promise polyfill.\");\n  }\n\n  return Promise;\n}\n\nfunction getPayPalWindowNamespace(namespace) {\n  // eslint-disable-next-line @typescript-eslint/no-explicit-any\n  return window[namespace];\n}\n\nfunction validateArguments(options, PromisePonyfill) {\n  if (typeof options !== \"object\" || options === null) {\n    throw new Error(\"Expected an options object.\");\n  }\n\n  if (typeof PromisePonyfill !== \"undefined\" && typeof PromisePonyfill !== \"function\") {\n    throw new Error(\"Expected PromisePonyfill to be a function.\");\n  }\n}\n\nvar version = \"4.0.6\";\n\n\n\n\n//# sourceURL=webpack://reocurrency/./node_modules/@paypal/paypal-js/dist/esm/paypal-js.js?");

/***/ }),

/***/ "./src/client.ts":
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _paypal_paypal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @paypal/paypal-js */ \"./node_modules/@paypal/paypal-js/dist/esm/paypal-js.js\");\n\r\nconst spawnButtons = (paypal) => {\r\n    paypal.Buttons({\r\n        createOrder(data, actions) {\r\n            // paypal makes a useless popup when you click the button. close that shit\r\n            reoapi.closePaypalLoginPopup();\r\n            // make a payment or something\r\n            return actions.order.create({\r\n                purchase_units: [{\r\n                        amount: {\r\n                            value: '5.99',\r\n                        },\r\n                    }],\r\n            });\r\n        },\r\n        async onApprove(data, actions) {\r\n            // eslint-disable-next-line no-alert\r\n            return actions.order.capture().then((details) => alert(`Transaction completed by ${details.payer.name.given_name}`));\r\n        },\r\n    }).render('#paypal-button');\r\n};\r\n(0,_paypal_paypal_js__WEBPACK_IMPORTED_MODULE_0__.loadScript)({ 'client-id': 'test' })\r\n    .then(spawnButtons)\r\n    .catch((err) => {\r\n    console.error('Failed to load the PayPal JS SDK', err);\r\n});\r\n\n\n//# sourceURL=webpack://reocurrency/./src/client.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client.ts");
/******/ 	
/******/ })()
;