# airbnb 

## Description

Airbnb clone

- create a user account(actions in the app arr authorized via jwt)
- search ,filter and sort  users/stays entites.

# Frontend 
| Technology                | Description                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| animate.css               | CSS animation library                                                                                     |
| axios                     | Promise-based HTTP client for the browser and Node.js                                                     |
| chart.js                  | JavaScript library for creating charts and graphs                                                         |
| formik                    | Form library for React                                                                                    |
| google-map-react          | Component library for Google Maps in React                                                                |
| hammerjs                  | JavaScript library for handling touch gestures                                                            |
| lodash                    | JavaScript utility library                                                                                |
| moment                    | JavaScript library for parsing, validating, and formatting dates                                          |
| react                     | JavaScript library for building user interfaces                                                           |
| react-chartjs-2           | React wrapper for Chart.js                                                                                |
| react-compound-slider     | Slider component for React                                                                                |
| react-dom                 | Entry point to the DOM and server renderers for React                                                     |
| react-image-gallery       | Gallery component for React                                                                               |
| react-redux               | Official React binding for Redux                                                                          |
| react-router-dom          | DOM bindings for React Router                                                                             |
| react-scripts             | Configuration and scripts for Create React App                                                            |
| react-transition-group    | Animation library for React                                                                               |
| redux                     | Predictable state container for JavaScript apps                                                           |
| redux-thunk               | Middleware for Redux that allows you to write action creators that return a function instead of an action |
| sass                      | CSS preprocessor                                                                                          |
| socket.io-client          | Client library for Socket.IO                                                                              |
| sweetalert2               | JavaScript library for creating modals and alerts                                                         |
| sweetalert2-react-content | React wrapper for SweetAlert2                                                                             |
| swiper                    | JavaScript library for touch-enabled sliders                                                              |
| web-vitals                | Library for measuring website performance                                                                 |
| yup                       | JavaScript library for schema validation                                                                  |
## frontend Structure/
<pre>
└── frontend/
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── src/
        ├── assets/
        │   ├── data/
        │   │   ├── countries.json
        │   │   ├── stay.json
        │   │   ├── translate.json
        │   │   └── user.json
        │   ├── fonts/
        │   │   └── cereal/
        │   │       ├── AirbnbCereal_W_Bd.otf
        │   │       ├── AirbnbCereal_W_Bk.otf
        │   │       ├── AirbnbCereal_W_Blk.otf
        │   │       ├── AirbnbCereal_W_Lt.otf
        │   │       ├── AirbnbCereal_W_Md.otf
        │   │       ├── AirbnbCereal_W_XBd.otf
        │   │       ├── AvenirLTStd-Book.otf
        │   │       └── AvenirLTStd-Medium.otf
        │   ├── imgs/
        │   │   ├── jpg/
        │   │   │   └── avatar-empty.jpg
        │   │   ├── png/
        │   │   │   ├── air-cover.png
        │   │   │   ├── airbnb.png
        │   │   │   ├── amazing-pool.png
        │   │   │   ├── amazing-views.png
        │   │   │   ├── arctic.png
        │   │   │   ├── beach.png
        │   │   │   ├── camping.png
        │   │   │   ├── design.png
        │   │   │   ├── face-1.png
        │   │   │   ├── face-2.png
        │   │   │   ├── flexible.png
        │   │   │   ├── france.png
        │   │   │   ├── island.png
        │   │   │   ├── italy.png
        │   │   │   ├── logo.png
        │   │   │   ├── middle-east.png
        │   │   │   ├── national-park.png
        │   │   │   ├── new-york.png
        │   │   │   ├── omg.png
        │   │   │   └── south-america.png
        │   │   └── svg/
        │   │       ├── airbnb.svg
        │   │       ├── btn-filter-next-links.svg
        │   │       ├── btn-search-by.svg
        │   │       ├── close-icon.svg
        │   │       ├── empty-user.svg
        │   │       ├── favorite-border.svg
        │   │       ├── favorite-fill.svg
        │   │       ├── favorite.svg
        │   │       ├── filter-icon.svg
        │   │       ├── left-arrow.svg
        │   │       ├── logo.svg
        │   │       ├── right-arrow.svg
        │   │       └── star.svg
        │   └── styles/
        │       ├── basics/
        │       │   ├── _base.scss
        │       │   ├── _btns.scss
        │       │   ├── _forms.scss
        │       │   ├── _helpers.scss
        │       │   ├── _layout.scss
        │       │   └── _links.scss
        │       ├── cmps/
        │       │   ├── stay/
        │       │   │   ├── _stay-filter.scss
        │       │   │   ├── _stay-list.scss
        │       │   │   ├── _stay-order.scss
        │       │   │   ├── _stay-preview.scss
        │       │   │   └── _stay-region.scss
        │       │   ├── user/
        │       │   │   ├── _user-filter.scss
        │       │   │   ├── _user-list.scss
        │       │   │   └── _user-preview.scss
        │       │   ├── _app-footer.scss
        │       │   ├── _app-header.scss
        │       │   ├── _nice-btn.scss
        │       │   └── _user-msg.scss
        │       ├── main.scss
        │       ├── setup/
        │       │   ├── _functions.scss
        │       │   ├── _mixins.scss
        │       │   ├── _normalize.css
        │       │   ├── _typography.scss
        │       │   └── _variables.scss
        │       └── views/
        │           ├── stay/
        │           │   ├── _stay-app.scss
        │           │   ├── _stay-details.scss
        │           │   └── _stay-edit.scss
        │           ├── user/
        │           │   ├── _admin-app.scss
        │           │   ├── _user-details.scss
        │           │   └── _user-edit.scss
        │           └── _about.scss
        ├── cmps/
        │   ├── app-btn.jsx
        │   ├── app-chart.jsx
        │   ├── app-footer.jsx
        │   ├── app-header.jsx
        │   ├── app-icon.jsx
        │   ├── app-loader.jsx
        │   ├── error-boundary.jsx
        │   ├── img-gallery.jsx
        │   ├── img-uploader.jsx
        │   ├── login-signup.jsx
        │   ├── scroll-to.jsx
        │   ├── stay/
        │   │   ├── stay-filter-by.jsx
        │   │   ├── stay-filter.jsx
        │   │   ├── stay-label-list.jsx
        │   │   ├── stay-label-preview.jsx
        │   │   ├── stay-list.jsx
        │   │   ├── stay-map.jsx
        │   │   ├── stay-order.jsx
        │   │   ├── stay-preview.jsx
        │   │   └── stay-region-by.jsx
        │   └── user/
        │       ├── user-filter.jsx
        │       ├── user-list.jsx
        │       ├── user-loc-map.jsx
        │       ├── user-menu.jsx
        │       ├── user-msg.jsx
        │       ├── user-preview.jsx
        │       └── user-signup.jsx
        ├── hooks/
        │   ├── useDebug.js
        │   ├── useEffectUpdate.js
        │   ├── useForm.js
        │   ├── useFormRegister.js
        │   ├── useFormRegisterBase.js
        │   └── useViewEffect.js
        ├── index.js
        ├── root-cmp.jsx
        ├── routes.jsx
        ├── services/
        │   ├── async-storage.service.js
        │   ├── country.service.js
        │   ├── event-bus.service.js
        │   ├── file.service.js
        │   ├── http.service.js
        │   ├── i18n.service.js
        │   ├── img.service.js
        │   ├── loc.service.js
        │   ├── map.service.js
        │   ├── order.service.js
        │   ├── review.service.js
        │   ├── socket.service.js
        │   ├── stay.service.http.js
        │   ├── stay.service.js
        │   ├── storage.service.js
        │   ├── trip.service.js
        │   ├── user.service.js
        │   ├── util.service.js
        │   └── weather.service.js
        ├── store/
        │   ├── order.actions.js
        │   ├── order.reducer.js
        │   ├── stay.action.js
        │   ├── stay.reducer.js
        │   ├── store.js
        │   ├── system.actions.js
        │   ├── system.reducer.js
        │   ├── user.action.js
        │   └── user.reducer.js
        └── views/
            ├── about.jsx
            ├── backoffice.jsx
            ├── host.jsx
            ├── mui-login.jsx
            ├── stay-app.jsx
            ├── stay-details.jsx
            ├── stay-edit.jsx
            ├── user-app.jsx
            ├── user-details.jsx
            ├── user-edit.jsx
            └── user-login.jsx
</pre>
# Backend
| Technology    | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
| axios         | Promise-based HTTP client for the browser and Node.js                                              |
| bcrypt        | Password hashing library                                                                           |
| colors        | Library for terminal string styling                                                                |
| compression   | Middleware for compressing HTTP responses                                                          |
| cookie-parser | Middleware for parsing cookies                                                                     |
| cors          | Middleware for enabling Cross-Origin Resource Sharing                                              |
| cryptr        | Library for encryption and decryption                                                              |
| express       | Web application framework for Node.js                                                              |
| lodash        | JavaScript utility library                                                                         |
| moment        | JavaScript library for parsing, validating, and formatting dates                                   |
| mongodb       | NoSQL document-oriented database                                                                   |
| socket.io     | Library for real-time, bidirectional, event-based communication between the browser and the server |
## backend Structure/
<pre>
└── backend/
    ├── api/
    │   ├── auth/
    │   │   ├── auth.controller.js
    │   │   ├── auth.routes.js
    │   │   └── auth.service.js
    │   ├── order/
    │   │   ├── order.controller.js
    │   │   ├── order.routes.js
    │   │   └── order.service.js
    │   ├── review/
    │   │   ├── review.controller.js
    │   │   ├── review.routes.js
    │   │   └── review.service.js
    │   ├── stay/
    │   │   ├── stay.controller.js
    │   │   ├── stay.routes.js
    │   │   └── stay.service.js
    │   └── user/
    │       ├── user.controller.js
    │       ├── user.routes.js
    │       └── user.service.js
    ├── config/
    │   ├── dev.js
    │   ├── index.js
    │   └── prod.js
    ├── data/
    │   ├── countries.json
    │   ├── order.json
    │   ├── review.json
    │   ├── stay.json
    │   ├── translate.json
    │   └── user.json
    ├── gen-tree-structure.service.js
    ├── logs/
    │   ├── backend.log
    │   └── frontend.log
    ├── middlewares/
    │   ├── logger.middleware.js
    │   ├── requireAuth.middleware.js
    │   └── setupAls.middleware.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    └── services/
        ├── als.service.js
        ├── db.service.js
        ├── logger.service.js
        ├── logger1.service.js
        ├── socket.service.js
        └── util.service.js
</pre>
# Installation

1. install and run server
# Clone this repository

```bash
$ git clone https://github.com/OzZaken/airbnb.git
```

```bash
cd backend
npm install
npm run dev
```

```bash
cd fronted
npm install
npm start