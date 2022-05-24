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
exports.id = "pages/switch";
exports.ids = ["pages/switch"];
exports.modules = {

/***/ "./pages/switch.tsx":
/*!**************************!*\
  !*** ./pages/switch.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CustomizedSwitches)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_FormGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/FormGroup */ \"@mui/material/FormGroup\");\n/* harmony import */ var _mui_material_FormGroup__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_FormGroup__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/FormControlLabel */ \"@mui/material/FormControlLabel\");\n/* harmony import */ var _mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Switch */ \"@mui/material/Switch\");\n/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst MaterialUISwitch = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)((_mui_material_Switch__WEBPACK_IMPORTED_MODULE_5___default()))(({ theme  })=>({\n        width: 62,\n        height: 34,\n        padding: 7,\n        \"& .MuiSwitch-switchBase\": {\n            margin: 1,\n            padding: 0,\n            transform: \"translateX(6px)\",\n            \"&.Mui-checked\": {\n                color: \"#fff\",\n                transform: \"translateX(22px)\",\n                \"& .MuiSwitch-thumb:before\": {\n                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"20\" width=\"20\" viewBox=\"0 0 20 20\"><path fill=\"${encodeURIComponent(\"#fff\")}\" d=\"M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z\"/></svg>')`\n                },\n                \"& + .MuiSwitch-track\": {\n                    opacity: 1,\n                    backgroundColor: theme.palette.mode === \"dark\" ? \"#8796A5\" : \"#aab4be\"\n                }\n            }\n        },\n        \"& .MuiSwitch-thumb\": {\n            backgroundColor: theme.palette.mode === \"dark\" ? \"#003892\" : \"#001e3c\",\n            width: 32,\n            height: 32,\n            \"&:before\": {\n                content: \"''\",\n                position: \"absolute\",\n                width: \"100%\",\n                height: \"100%\",\n                left: 0,\n                top: 0,\n                backgroundRepeat: \"no-repeat\",\n                backgroundPosition: \"center\",\n                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"20\" width=\"20\" viewBox=\"0 0 20 20\"><path fill=\"${encodeURIComponent(\"#fff\")}\" d=\"M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z\"/></svg>')`\n            }\n        },\n        \"& .MuiSwitch-track\": {\n            opacity: 1,\n            backgroundColor: theme.palette.mode === \"dark\" ? \"#8796A5\" : \"#aab4be\",\n            borderRadius: 20 / 2\n        }\n    })\n);\nfunction CustomizedSwitches() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_material_FormGroup__WEBPACK_IMPORTED_MODULE_3___default()), {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_4___default()), {\n            control: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(MaterialUISwitch, {\n                sx: {\n                    m: 1\n                },\n                defaultChecked: true\n            }, void 0, false, void 0, void 0),\n            label: \"MUI switch\"\n        }, void 0, false, {\n            fileName: \"/Users/hedvigmejstedt/Datting/tunes-and-friends/TunesAndFriends/pages/switch.tsx\",\n            lineNumber: 57,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/hedvigmejstedt/Datting/tunes-and-friends/TunesAndFriends/pages/switch.tsx\",\n        lineNumber: 56,\n        columnNumber: 5\n    }, this);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9zd2l0Y2gudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUErQjtBQUNlO0FBQ0U7QUFDYztBQUNwQjtBQUUxQyxNQUFNSyxnQkFBZ0IsR0FBR0osNERBQU0sQ0FBQ0csNkRBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRUUsS0FBSyxHQUFFLEdBQUssQ0FBQztRQUN0REMsS0FBSyxFQUFFLEVBQUU7UUFDVEMsTUFBTSxFQUFFLEVBQUU7UUFDVkMsT0FBTyxFQUFFLENBQUM7UUFDVix5QkFBeUIsRUFBRTtZQUN6QkMsTUFBTSxFQUFFLENBQUM7WUFDVEQsT0FBTyxFQUFFLENBQUM7WUFDVkUsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixlQUFlLEVBQUU7Z0JBQ2ZDLEtBQUssRUFBRSxNQUFNO2dCQUNiRCxTQUFTLEVBQUUsa0JBQWtCO2dCQUM3QiwyQkFBMkIsRUFBRTtvQkFDM0JFLGVBQWUsRUFBRSxDQUFDLDRIQUE0SCxFQUFFQyxrQkFBa0IsQ0FDaEssTUFBTSxDQUNQLENBQUMsK0hBQStILENBQUM7aUJBQ25JO2dCQUNELHNCQUFzQixFQUFFO29CQUN0QkMsT0FBTyxFQUFFLENBQUM7b0JBQ1ZDLGVBQWUsRUFBRVYsS0FBSyxDQUFDVyxPQUFPLENBQUNDLElBQUksS0FBSyxNQUFNLEdBQUcsU0FBUyxHQUFHLFNBQVM7aUJBQ3ZFO2FBQ0Y7U0FDRjtRQUNELG9CQUFvQixFQUFFO1lBQ3BCRixlQUFlLEVBQUVWLEtBQUssQ0FBQ1csT0FBTyxDQUFDQyxJQUFJLEtBQUssTUFBTSxHQUFHLFNBQVMsR0FBRyxTQUFTO1lBQ3RFWCxLQUFLLEVBQUUsRUFBRTtZQUNUQyxNQUFNLEVBQUUsRUFBRTtZQUNWLFVBQVUsRUFBRTtnQkFDVlcsT0FBTyxFQUFFLElBQUk7Z0JBQ2JDLFFBQVEsRUFBRSxVQUFVO2dCQUNwQmIsS0FBSyxFQUFFLE1BQU07Z0JBQ2JDLE1BQU0sRUFBRSxNQUFNO2dCQUNkYSxJQUFJLEVBQUUsQ0FBQztnQkFDUEMsR0FBRyxFQUFFLENBQUM7Z0JBQ05DLGdCQUFnQixFQUFFLFdBQVc7Z0JBQzdCQyxrQkFBa0IsRUFBRSxRQUFRO2dCQUM1QlgsZUFBZSxFQUFFLENBQUMsNEhBQTRILEVBQUVDLGtCQUFrQixDQUNoSyxNQUFNLENBQ1AsQ0FBQywwbEJBQTBsQixDQUFDO2FBQzlsQjtTQUNGO1FBQ0Qsb0JBQW9CLEVBQUU7WUFDcEJDLE9BQU8sRUFBRSxDQUFDO1lBQ1ZDLGVBQWUsRUFBRVYsS0FBSyxDQUFDVyxPQUFPLENBQUNDLElBQUksS0FBSyxNQUFNLEdBQUcsU0FBUyxHQUFHLFNBQVM7WUFDdEVPLFlBQVksRUFBRSxFQUFFLEdBQUcsQ0FBQztTQUNyQjtLQUNGLENBQUM7QUFBQSxDQUFDO0FBRVksU0FBU0Msa0JBQWtCLEdBQUc7SUFDM0MscUJBQ0UsOERBQUN4QixnRUFBUztrQkFDUiw0RUFBQ0MsdUVBQWdCO1lBQ2Z3QixPQUFPLGdCQUFFLDhEQUFDdEIsZ0JBQWdCO2dCQUFDdUIsRUFBRSxFQUFFO29CQUFFQyxDQUFDLEVBQUUsQ0FBQztpQkFBRTtnQkFBRUMsY0FBYzs2Q0FBRztZQUMxREMsS0FBSyxFQUFDLFlBQVk7Ozs7O2dCQUNsQjs7Ozs7WUFDUSxDQUNaO0NBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtdHlwZXNjcmlwdC1zdGFydGVyLy4vcGFnZXMvc3dpdGNoLnRzeD9hMTdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcbmltcG9ydCBGb3JtR3JvdXAgZnJvbSAnQG11aS9tYXRlcmlhbC9Gb3JtR3JvdXAnO1xuaW1wb3J0IEZvcm1Db250cm9sTGFiZWwgZnJvbSAnQG11aS9tYXRlcmlhbC9Gb3JtQ29udHJvbExhYmVsJztcbmltcG9ydCBTd2l0Y2ggZnJvbSAnQG11aS9tYXRlcmlhbC9Td2l0Y2gnO1xuXG5jb25zdCBNYXRlcmlhbFVJU3dpdGNoID0gc3R5bGVkKFN3aXRjaCkoKHsgdGhlbWUgfSkgPT4gKHtcbiAgd2lkdGg6IDYyLFxuICBoZWlnaHQ6IDM0LFxuICBwYWRkaW5nOiA3LFxuICAnJiAuTXVpU3dpdGNoLXN3aXRjaEJhc2UnOiB7XG4gICAgbWFyZ2luOiAxLFxuICAgIHBhZGRpbmc6IDAsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg2cHgpJyxcbiAgICAnJi5NdWktY2hlY2tlZCc6IHtcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDIycHgpJyxcbiAgICAgICcmIC5NdWlTd2l0Y2gtdGh1bWI6YmVmb3JlJzoge1xuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjIwXCIgd2lkdGg9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIj48cGF0aCBmaWxsPVwiJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgJyNmZmYnXG4gICAgICAgICl9XCIgZD1cIk00LjIgMi41bC0uNyAxLjgtMS44LjcgMS44LjcuNyAxLjguNi0xLjhMNi43IDVsLTEuOS0uNy0uNi0xLjh6bTE1IDguM2E2LjcgNi43IDAgMTEtNi42LTYuNiA1LjggNS44IDAgMDA2LjYgNi42elwiLz48L3N2Zz4nKWAsXG4gICAgICB9LFxuICAgICAgJyYgKyAuTXVpU3dpdGNoLXRyYWNrJzoge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUubW9kZSA9PT0gJ2RhcmsnID8gJyM4Nzk2QTUnIDogJyNhYWI0YmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICAnJiAuTXVpU3dpdGNoLXRodW1iJzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5tb2RlID09PSAnZGFyaycgPyAnIzAwMzg5MicgOiAnIzAwMWUzYycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgJyY6YmVmb3JlJzoge1xuICAgICAgY29udGVudDogXCInJ1wiLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgICAgYmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsXG4gICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyMFwiIHdpZHRoPVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCI+PHBhdGggZmlsbD1cIiR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAnI2ZmZidcbiAgICAgICl9XCIgZD1cIk05LjMwNSAxLjY2N1YzLjc1aDEuMzg5VjEuNjY3aC0xLjM5em0tNC43MDcgMS45NWwtLjk4Mi45ODJMNS4wOSA2LjA3MmwuOTgyLS45ODItMS40NzMtMS40NzN6bTEwLjgwMiAwTDEzLjkyNyA1LjA5bC45ODIuOTgyIDEuNDczLTEuNDczLS45ODItLjk4MnpNMTAgNS4xMzlhNC44NzIgNC44NzIgMCAwMC00Ljg2MiA0Ljg2QTQuODcyIDQuODcyIDAgMDAxMCAxNC44NjIgNC44NzIgNC44NzIgMCAwMDE0Ljg2IDEwIDQuODcyIDQuODcyIDAgMDAxMCA1LjEzOXptMCAxLjM4OUEzLjQ2MiAzLjQ2MiAwIDAxMTMuNDcxIDEwYTMuNDYyIDMuNDYyIDAgMDEtMy40NzMgMy40NzJBMy40NjIgMy40NjIgMCAwMTYuNTI3IDEwIDMuNDYyIDMuNDYyIDAgMDExMCA2LjUyOHpNMS42NjUgOS4zMDV2MS4zOWgyLjA4M3YtMS4zOUgxLjY2NnptMTQuNTgzIDB2MS4zOWgyLjA4NHYtMS4zOWgtMi4wODR6TTUuMDkgMTMuOTI4TDMuNjE2IDE1LjRsLjk4Mi45ODIgMS40NzMtMS40NzMtLjk4Mi0uOTgyem05LjgyIDBsLS45ODIuOTgyIDEuNDczIDEuNDczLjk4Mi0uOTgyLTEuNDczLTEuNDczek05LjMwNSAxNi4yNXYyLjA4M2gxLjM4OVYxNi4yNWgtMS4zOXpcIi8+PC9zdmc+JylgLFxuICAgIH0sXG4gIH0sXG4gICcmIC5NdWlTd2l0Y2gtdHJhY2snOiB7XG4gICAgb3BhY2l0eTogMSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUubW9kZSA9PT0gJ2RhcmsnID8gJyM4Nzk2QTUnIDogJyNhYWI0YmUnLFxuICAgIGJvcmRlclJhZGl1czogMjAgLyAyLFxuICB9LFxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXN0b21pemVkU3dpdGNoZXMoKSB7XG4gIHJldHVybiAoXG4gICAgPEZvcm1Hcm91cD5cbiAgICAgIDxGb3JtQ29udHJvbExhYmVsXG4gICAgICAgIGNvbnRyb2w9ezxNYXRlcmlhbFVJU3dpdGNoIHN4PXt7IG06IDEgfX0gZGVmYXVsdENoZWNrZWQgLz59XG4gICAgICAgIGxhYmVsPSdNVUkgc3dpdGNoJ1xuICAgICAgLz5cbiAgICA8L0Zvcm1Hcm91cD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInN0eWxlZCIsIkZvcm1Hcm91cCIsIkZvcm1Db250cm9sTGFiZWwiLCJTd2l0Y2giLCJNYXRlcmlhbFVJU3dpdGNoIiwidGhlbWUiLCJ3aWR0aCIsImhlaWdodCIsInBhZGRpbmciLCJtYXJnaW4iLCJ0cmFuc2Zvcm0iLCJjb2xvciIsImJhY2tncm91bmRJbWFnZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm9wYWNpdHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWxldHRlIiwibW9kZSIsImNvbnRlbnQiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJiYWNrZ3JvdW5kUmVwZWF0IiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiYm9yZGVyUmFkaXVzIiwiQ3VzdG9taXplZFN3aXRjaGVzIiwiY29udHJvbCIsInN4IiwibSIsImRlZmF1bHRDaGVja2VkIiwibGFiZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/switch.tsx\n");

/***/ }),

/***/ "@mui/material/FormControlLabel":
/*!*************************************************!*\
  !*** external "@mui/material/FormControlLabel" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@mui/material/FormControlLabel");

/***/ }),

/***/ "@mui/material/FormGroup":
/*!******************************************!*\
  !*** external "@mui/material/FormGroup" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/material/FormGroup");

/***/ }),

/***/ "@mui/material/Switch":
/*!***************************************!*\
  !*** external "@mui/material/Switch" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/material/Switch");

/***/ }),

/***/ "@mui/material/styles":
/*!***************************************!*\
  !*** external "@mui/material/styles" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/material/styles");

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
var __webpack_exports__ = (__webpack_exec__("./pages/switch.tsx"));
module.exports = __webpack_exports__;

})();