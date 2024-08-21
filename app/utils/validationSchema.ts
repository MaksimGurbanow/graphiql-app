import * as yup from 'yup';
/* eslint-disable no-useless-escape */
const atLeastOneUppercase = /[A-Z]/g;
const atLeastOneLowercase = /[a-z]/g; 
const atLeastOneNumeric = /[0-9]/g;
const atLeastOneSpecialChar = /(?=.*[#?!@$%^&*-])/u; 
const eMail = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){1,}[a-z0-9]{0,}$/

export const validationSchema = yup.object().shape({
  email: yup.string().required('E-mail is required').matches(eMail, 'E-mail must be in format "example@example.com"'),
  password: yup
    .string()
    .required('Password is required')
    .matches(atLeastOneUppercase, 'Must contain 1 uppercase')
    .matches(atLeastOneLowercase, 'Must contain 1 lowercase')
    .matches(atLeastOneNumeric, 'Must contain 1 number')  
    .matches(atLeastOneSpecialChar, 'Must contain 1 special character')
    .min(8, 'Password should be 8 charachters'),
});