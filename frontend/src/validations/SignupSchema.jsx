import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot be more than 20 characters")
        .matches(
            /^(?=.*[A-Za-z])[A-Za-z0-9_]+$/,
            "Username must contain letters and can include numbers and underscores only"
        )
        .required("Username is required"),

    email: Yup.string()
        .email("Invalid email format")
        .max(100, "Email is too long")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password cannot exceed 20 characters")
        .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
        .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
        .matches(/\d/, "Password must contain at least 1 number")
        .matches(
            /[@$!%*?&]/,
            "Password must contain at least 1 special character (@, $, !, %, *, ?, &)"
        )
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Confirm password is required"),
});

export default SignupSchema;
