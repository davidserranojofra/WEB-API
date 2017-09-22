// const express = require('express');
// const router = express.Router();
// const { query, validationResult } = require('express-validator/check');


// router.get('/apiv1/anuncios', [
//     //valido campos
//     query('precio').isNumeric().withMessage('el valor del Campo minimo no es numérico'),
// ], (req, res, next) => {
//         validationResult(req).throw();
//         // res.json({ list: list });
//     next();
// });

// module.exports = router;

// const { check, validationResult } = require('express-validator/check');
// const { matchedData } = require('express-validator/filter');

// app.get('/apiv1/anuncios', [
//     check('foto')
//         .isEmpty()
//         .withMessage('Te falta la foto')
//         .custom(value => {
//             return findUserByEmail(value).then(user => {
//                 throw new Error('this email is already in use');
//             })
//         }),

//   // General error messages can be given as a 2nd argument in the check APIs
//   check('password', 'passwords must be at least 5 chars long and contain one number')
//     .isLength({ min: 5 })
//     .matches(/\d/),

//   // No special validation required? Just check if data exists:
//   check('addresses.*.street').exists(),

//   // Wildcards * are accepted!
//   check('addresses.*.postalCode').isPostalCode(),

//   // Sanitize the number of each address, making it arrive as an integer
//   sanitize('addresses.*.number').toInt()
// ], (req, res, next) => {
//   // Get the validation result whenever you want; see the Validation Result API for all options!
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.mapped() });
//   }
// });

// module.exports = 