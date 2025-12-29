import * as Yup from 'yup';

export const WishSchema = Yup.object().shape({
    content: Yup.string()
        .required('Wish content is required!')
        .min(10, 'Wish must be at least 10 characters long.')
        .max(300, 'Wish is too long (max 300 chars).')
        .matches(/^[^<>{}]*$/, 'Special characters like < > { } are not allowed for security.')
});
