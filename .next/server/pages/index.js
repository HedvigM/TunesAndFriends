"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ \"@mui/material\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ \"@auth0/nextjs-auth0\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst IndexPage = ({})=>{\n    const { user  } = (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_4__.useUser)();\n    console.log(user);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Container, {\n        maxWidth: \"md\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Tunes & Friends\"\n                }, void 0, false, {\n                    fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                    lineNumber: 14,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                mt: 6,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Paper, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                        p: 2,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"This is the new tunes and friends landingpage. It's using the mui library: \",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                        href: \"https://mui.com/\",\n                                        children: \"MUI\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                                        lineNumber: 21,\n                                        columnNumber: 24\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                                lineNumber: 19,\n                                columnNumber: 13\n                            }, undefined),\n                            user ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                                children: user.name\n                            }, void 0, false, {\n                                fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                                lineNumber: 24,\n                                columnNumber: 15\n                            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                                children: [\n                                    \"Ej inloggad\",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                                        variant: \"contained\",\n                                        href: \"/api/auth/login\",\n                                        children: \"Logga in\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                                        lineNumber: 28,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                                lineNumber: 26,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                        lineNumber: 18,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                    lineNumber: 17,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/index.tsx\",\n        lineNumber: 12,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUEwQjtBQUVHO0FBQ2lDO0FBQ2hCO0FBRTlDLE1BQU1PLFNBQVMsR0FBaUIsQ0FBQyxFQUFFLEdBQUs7SUFDdEMsTUFBTSxFQUFFQyxJQUFJLEdBQUUsR0FBR0YsNERBQU8sRUFBRTtJQUMxQkcsT0FBTyxDQUFDQyxHQUFHLENBQUNGLElBQUksQ0FBQyxDQUFDO0lBRWxCLHFCQUNFLDhEQUFDTixvREFBUztRQUFDUyxRQUFRLEVBQUMsSUFBSTs7MEJBQ3RCLDhEQUFDVixrREFBSTswQkFDSCw0RUFBQ1csT0FBSzs4QkFBQyxpQkFBZTs7Ozs7NkJBQVE7Ozs7O3lCQUN6QjswQkFDUCw4REFBQ1QsOENBQUc7Z0JBQUNVLEVBQUUsRUFBRSxDQUFDOzBCQUNSLDRFQUFDVCxnREFBSzs4QkFDSiw0RUFBQ0QsOENBQUc7d0JBQUNXLENBQUMsRUFBRSxDQUFDOzswQ0FDUCw4REFBQ0EsR0FBQzs7b0NBQUMsNkVBRVE7a0RBQUEsOERBQUNDLEdBQUM7d0NBQUNDLElBQUksRUFBQyxrQkFBa0I7a0RBQUMsS0FBRzs7Ozs7aURBQUk7Ozs7Ozt5Q0FDekM7NEJBQ0hSLElBQUksaUJBQ0gsOERBQUNMLDhDQUFHOzBDQUFFSyxJQUFJLENBQUNTLElBQUk7Ozs7O3lDQUFPLGlCQUV0Qiw4REFBQ2QsOENBQUc7O29DQUFDLGFBRUg7a0RBQUEsOERBQUNFLGlEQUFNO3dDQUFDYSxPQUFPLEVBQUMsV0FBVzt3Q0FBQ0YsSUFBSSxFQUFDLGlCQUFpQjtrREFBQyxVQUVuRDs7Ozs7aURBQVM7Ozs7Ozt5Q0FDTDs7Ozs7O2lDQUVKOzs7Ozs2QkFDQTs7Ozs7eUJBQ0o7Ozs7OztpQkFDSSxDQUNaO0NBQ0g7QUFFRCxpRUFBZVQsU0FBUyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLXR5cGVzY3JpcHQtc3RhcnRlci8uL3BhZ2VzL2luZGV4LnRzeD8wN2ZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB7IENvbnRhaW5lciwgQm94LCBQYXBlciwgQnV0dG9uIH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5pbXBvcnQgeyB1c2VVc2VyIH0gZnJvbSAnQGF1dGgwL25leHRqcy1hdXRoMCc7XG5cbmNvbnN0IEluZGV4UGFnZTogTmV4dFBhZ2U8e30+ID0gKHt9KSA9PiB7XG4gIGNvbnN0IHsgdXNlciB9ID0gdXNlVXNlcigpO1xuICBjb25zb2xlLmxvZyh1c2VyKTtcblxuICByZXR1cm4gKFxuICAgIDxDb250YWluZXIgbWF4V2lkdGg9J21kJz5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+VHVuZXMgJiBGcmllbmRzPC90aXRsZT5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxCb3ggbXQ9ezZ9PlxuICAgICAgICA8UGFwZXI+XG4gICAgICAgICAgPEJveCBwPXsyfT5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICBUaGlzIGlzIHRoZSBuZXcgdHVuZXMgYW5kIGZyaWVuZHMgbGFuZGluZ3BhZ2UuIEl0J3MgdXNpbmcgdGhlIG11aVxuICAgICAgICAgICAgICBsaWJyYXJ5OiA8YSBocmVmPSdodHRwczovL211aS5jb20vJz5NVUk8L2E+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICB7dXNlciA/IChcbiAgICAgICAgICAgICAgPEJveD57dXNlci5uYW1lfTwvQm94PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPEJveD5cbiAgICAgICAgICAgICAgICBFaiBpbmxvZ2dhZFxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD0nY29udGFpbmVkJyBocmVmPScvYXBpL2F1dGgvbG9naW4nPlxuICAgICAgICAgICAgICAgICAgTG9nZ2EgaW5cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L1BhcGVyPlxuICAgICAgPC9Cb3g+XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmRleFBhZ2U7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJIZWFkIiwiQ29udGFpbmVyIiwiQm94IiwiUGFwZXIiLCJCdXR0b24iLCJ1c2VVc2VyIiwiSW5kZXhQYWdlIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJtYXhXaWR0aCIsInRpdGxlIiwibXQiLCJwIiwiYSIsImhyZWYiLCJuYW1lIiwidmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "@auth0/nextjs-auth0":
/*!**************************************!*\
  !*** external "@auth0/nextjs-auth0" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "@mui/material":
/*!********************************!*\
  !*** external "@mui/material" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();