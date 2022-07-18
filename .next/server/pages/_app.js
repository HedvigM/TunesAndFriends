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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ \"@mui/material\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react */ \"@emotion/react\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/cache */ \"@emotion/cache\");\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_emotion_cache__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var styles_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styles/theme */ \"./styles/theme.ts\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ \"@auth0/nextjs-auth0\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n\nconst clientSideEmotionCache = _emotion_cache__WEBPACK_IMPORTED_MODULE_6___default()({\n    key: \"css\",\n    prepend: true\n});\nfunction MyApp({ Component , emotionCache =clientSideEmotionCache , pageProps ,  }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_8__.UserProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_emotion_react__WEBPACK_IMPORTED_MODULE_5__.CacheProvider, {\n            value: emotionCache,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no\"\n                    }, void 0, false, {\n                        fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/_app.tsx\",\n                        lineNumber: 24,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/_app.tsx\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {\n                    theme: styles_theme__WEBPACK_IMPORTED_MODULE_7__.theme,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.CssBaseline, {}, void 0, false, {\n                            fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/_app.tsx\",\n                            lineNumber: 30,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Component, {\n                            ...pageProps,\n                            key: router.asPath,\n                            __source: {\n                                fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/_app.tsx\",\n                                lineNumber: 31,\n                                columnNumber: 11\n                            },\n                            __self: this\n                        })\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/_app.tsx\",\n                    lineNumber: 29,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/_app.tsx\",\n            lineNumber: 22,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/hedvigmejstedt/Datting/TAF/TunesAndFriends/pages/_app.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFBMEI7QUFDYztBQUNYO0FBQzhCO0FBQ1o7QUFDTjtBQUNKO0FBRWM7QUFFbkQsTUFBTVMsc0JBQXNCLEdBQUdILHFEQUFXLENBQUM7SUFBRUksR0FBRyxFQUFFLEtBQUs7SUFBRUMsT0FBTyxFQUFFLElBQUk7Q0FBRSxDQUFDO0FBRXpFLFNBQVNDLEtBQUssQ0FBQyxFQUNiQyxTQUFTLEdBQ1RDLFlBQVksRUFBR0wsc0JBQXNCLEdBQ3JDTSxTQUFTLEtBQ1YsRUFBRTtJQUNELE1BQU1DLE1BQU0sR0FBR2Ysc0RBQVMsRUFBRTtJQUUxQixxQkFDRSw4REFBQ08sNkRBQVk7a0JBQ1gsNEVBQUNILHlEQUFhO1lBQUNZLEtBQUssRUFBRUgsWUFBWTs7OEJBQ2hDLDhEQUFDWixrREFBSTs4QkFDSCw0RUFBQ2dCLE1BQUk7d0JBQ0hDLElBQUksRUFBQyxVQUFVO3dCQUNmQyxPQUFPLEVBQUMsd0VBQXdFOzs7Ozs0QkFDaEY7Ozs7O3dCQUNHOzhCQUNQLDhEQUFDakIsd0RBQWE7b0JBQUNJLEtBQUssRUFBRUEsK0NBQUs7O3NDQUN6Qiw4REFBQ0gsc0RBQVc7Ozs7Z0NBQUc7c0NBQ2YscURBQUNTLFNBQVM7NEJBQUUsR0FBR0UsU0FBUzs0QkFBRUwsR0FBRyxFQUFFTSxNQUFNLENBQUNLLE1BQU07Ozs7Ozs7MEJBQUk7Ozs7Ozt3QkFDbEM7Ozs7OztnQkFDRjs7Ozs7WUFDSCxDQUNmO0NBQ0g7QUFFRCxpRUFBZVQsS0FBSyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLXR5cGVzY3JpcHQtc3RhcnRlci8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyLCBDc3NCYXNlbGluZSB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQ2FjaGVQcm92aWRlciB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBjcmVhdGVDYWNoZSBmcm9tICdAZW1vdGlvbi9jYWNoZSc7XG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJ3N0eWxlcy90aGVtZSc7XG5cbmltcG9ydCB7IFVzZXJQcm92aWRlciB9IGZyb20gJ0BhdXRoMC9uZXh0anMtYXV0aDAnO1xuXG5jb25zdCBjbGllbnRTaWRlRW1vdGlvbkNhY2hlID0gY3JlYXRlQ2FjaGUoeyBrZXk6ICdjc3MnLCBwcmVwZW5kOiB0cnVlIH0pO1xuXG5mdW5jdGlvbiBNeUFwcCh7XG4gIENvbXBvbmVudCxcbiAgZW1vdGlvbkNhY2hlID0gY2xpZW50U2lkZUVtb3Rpb25DYWNoZSxcbiAgcGFnZVByb3BzLFxufSkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICByZXR1cm4gKFxuICAgIDxVc2VyUHJvdmlkZXI+XG4gICAgICA8Q2FjaGVQcm92aWRlciB2YWx1ZT17ZW1vdGlvbkNhY2hlfT5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgPG1ldGFcbiAgICAgICAgICAgIG5hbWU9J3ZpZXdwb3J0J1xuICAgICAgICAgICAgY29udGVudD0nbWluaW11bS1zY2FsZT0xLCBpbml0aWFsLXNjYWxlPTEsIHdpZHRoPWRldmljZS13aWR0aCwgc2hyaW5rLXRvLWZpdD1ubydcbiAgICAgICAgICAvPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgICAgPENzc0Jhc2VsaW5lIC8+XG4gICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSBrZXk9e3JvdXRlci5hc1BhdGh9IC8+XG4gICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgICA8L1VzZXJQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSb3V0ZXIiLCJIZWFkIiwiVGhlbWVQcm92aWRlciIsIkNzc0Jhc2VsaW5lIiwiQ2FjaGVQcm92aWRlciIsImNyZWF0ZUNhY2hlIiwidGhlbWUiLCJVc2VyUHJvdmlkZXIiLCJjbGllbnRTaWRlRW1vdGlvbkNhY2hlIiwia2V5IiwicHJlcGVuZCIsIk15QXBwIiwiQ29tcG9uZW50IiwiZW1vdGlvbkNhY2hlIiwicGFnZVByb3BzIiwicm91dGVyIiwidmFsdWUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJhc1BhdGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/theme.ts":
/*!*************************!*\
  !*** ./styles/theme.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"theme\": () => (/* binding */ theme)\n/* harmony export */ });\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material */ \"@mui/material\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_0__);\n\nconst theme = (0,_mui_material__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    palette: {\n        mode: \"light\"\n    },\n    typography: {\n        fontSize: 16,\n        h1: {\n            fontSize: \"2rem\",\n            fontWeight: 700\n        },\n        h2: {\n            fontSize: \"1.5rem\",\n            fontWeight: 700,\n            paddingTop: \"2rem\"\n        },\n        h3: {\n            fontSize: \"1.2rem\",\n            fontWeight: 700\n        },\n        h4: {\n            fontSize: \"1.15rem\",\n            fontWeight: 700\n        },\n        h5: {\n            fontSize: \"1.07rem\",\n            fontWeight: 700\n        },\n        h6: {\n            fontSize: \"1rem\",\n            fontWeight: 700\n        },\n        body1: {\n            fontSize: \"1rem\"\n        },\n        body2: {\n            fontSize: \"1rem\"\n        },\n        button: {\n            textTransform: \"none\"\n        }\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvdGhlbWUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRDO0FBRXJDLE1BQU1DLEtBQUssR0FBR0QsMERBQVcsQ0FBQztJQUMvQkUsT0FBTyxFQUFFO1FBQ1BDLElBQUksRUFBRSxPQUFPO0tBQ2Q7SUFDREMsVUFBVSxFQUFFO1FBQ1ZDLFFBQVEsRUFBRSxFQUFFO1FBQ1pDLEVBQUUsRUFBRTtZQUNGRCxRQUFRLEVBQUUsTUFBTTtZQUNoQkUsVUFBVSxFQUFFLEdBQUc7U0FDaEI7UUFDREMsRUFBRSxFQUFFO1lBQ0ZILFFBQVEsRUFBRSxRQUFRO1lBQ2xCRSxVQUFVLEVBQUUsR0FBRztZQUNmRSxVQUFVLEVBQUUsTUFBTTtTQUNuQjtRQUNEQyxFQUFFLEVBQUU7WUFDRkwsUUFBUSxFQUFFLFFBQVE7WUFDbEJFLFVBQVUsRUFBRSxHQUFHO1NBQ2hCO1FBQ0RJLEVBQUUsRUFBRTtZQUNGTixRQUFRLEVBQUUsU0FBUztZQUNuQkUsVUFBVSxFQUFFLEdBQUc7U0FDaEI7UUFDREssRUFBRSxFQUFFO1lBQ0ZQLFFBQVEsRUFBRSxTQUFTO1lBQ25CRSxVQUFVLEVBQUUsR0FBRztTQUNoQjtRQUNETSxFQUFFLEVBQUU7WUFDRlIsUUFBUSxFQUFFLE1BQU07WUFDaEJFLFVBQVUsRUFBRSxHQUFHO1NBQ2hCO1FBQ0RPLEtBQUssRUFBRTtZQUNMVCxRQUFRLEVBQUUsTUFBTTtTQUNqQjtRQUNEVSxLQUFLLEVBQUU7WUFDTFYsUUFBUSxFQUFFLE1BQU07U0FDakI7UUFDRFcsTUFBTSxFQUFFO1lBQ05DLGFBQWEsRUFBRSxNQUFNO1NBQ3RCO0tBQ0Y7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtdHlwZXNjcmlwdC1zdGFydGVyLy4vc3R5bGVzL3RoZW1lLnRzPzY5NmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlVGhlbWUgfSBmcm9tICdAbXVpL21hdGVyaWFsJztcblxuZXhwb3J0IGNvbnN0IHRoZW1lID0gY3JlYXRlVGhlbWUoe1xuICBwYWxldHRlOiB7XG4gICAgbW9kZTogJ2xpZ2h0J1xuICB9LFxuICB0eXBvZ3JhcGh5OiB7XG4gICAgZm9udFNpemU6IDE2LFxuICAgIGgxOiB7XG4gICAgICBmb250U2l6ZTogJzJyZW0nLFxuICAgICAgZm9udFdlaWdodDogNzAwXG4gICAgfSxcbiAgICBoMjoge1xuICAgICAgZm9udFNpemU6ICcxLjVyZW0nLFxuICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgICAgcGFkZGluZ1RvcDogJzJyZW0nXG4gICAgfSxcbiAgICBoMzoge1xuICAgICAgZm9udFNpemU6ICcxLjJyZW0nLFxuICAgICAgZm9udFdlaWdodDogNzAwXG4gICAgfSxcbiAgICBoNDoge1xuICAgICAgZm9udFNpemU6ICcxLjE1cmVtJyxcbiAgICAgIGZvbnRXZWlnaHQ6IDcwMFxuICAgIH0sXG4gICAgaDU6IHtcbiAgICAgIGZvbnRTaXplOiAnMS4wN3JlbScsXG4gICAgICBmb250V2VpZ2h0OiA3MDBcbiAgICB9LFxuICAgIGg2OiB7XG4gICAgICBmb250U2l6ZTogJzFyZW0nLFxuICAgICAgZm9udFdlaWdodDogNzAwXG4gICAgfSxcbiAgICBib2R5MToge1xuICAgICAgZm9udFNpemU6ICcxcmVtJ1xuICAgIH0sXG4gICAgYm9keTI6IHtcbiAgICAgIGZvbnRTaXplOiAnMXJlbSdcbiAgICB9LFxuICAgIGJ1dHRvbjoge1xuICAgICAgdGV4dFRyYW5zZm9ybTogJ25vbmUnXG4gICAgfVxuICB9XG59KTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVUaGVtZSIsInRoZW1lIiwicGFsZXR0ZSIsIm1vZGUiLCJ0eXBvZ3JhcGh5IiwiZm9udFNpemUiLCJoMSIsImZvbnRXZWlnaHQiLCJoMiIsInBhZGRpbmdUb3AiLCJoMyIsImg0IiwiaDUiLCJoNiIsImJvZHkxIiwiYm9keTIiLCJidXR0b24iLCJ0ZXh0VHJhbnNmb3JtIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles/theme.ts\n");

/***/ }),

/***/ "@auth0/nextjs-auth0":
/*!**************************************!*\
  !*** external "@auth0/nextjs-auth0" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@emotion/cache");

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@emotion/react");

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

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

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
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();