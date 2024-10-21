// This file is auto-generated by @hey-api/openapi-ts

export type Address = {
    city: string;
    createdAt: Date;
    firstName: string;
    fullAddress: string;
    id: string;
    isDefault: boolean;
    landmark?: (string) | null;
    lastName: string;
    phoneNumber: string;
    postalCode: number;
    state: string;
    userId: string;
};

export type AuthForgotPasswordInput = {
    /**
     * Email address of the user.
     */
    email: string;
};

/**
 * Credentials of the user.
 */
export type AuthLoginInput = {
    /**
     * Email address of the user.
     */
    email: string;
    /**
     * Password of the user.
     */
    password: string;
};

export type AuthRegisterInput = {
    /**
     * Password Confirmation.
     */
    confirmPassword: string;
    /**
     * Email address of the user.
     */
    email: string;
    /**
     * Full name of the user.
     */
    fullName: string;
    /**
     * Password of the user.
     * Min. 8 characters.
     */
    password: string;
};

export type AuthRegisterVerifyInput = AuthRegisterInput & {
    /**
     * Verification code (OTP).
     */
    code: number;
};

export type AuthResetPasswordInput = {
    /**
     * Password Confirmation.
     */
    confirmPassword: string;
    /**
     * Email address of the user.
     */
    email: string;
    /**
     * Verification code (OTP).
     */
    otp: number;
    /**
     * New Password to set.
     */
    password: string;
};

export type CreateAddressInput = {
    /**
     * City of the user.
     */
    city: string;
    /**
     * First name of the user.
     */
    firstName: string;
    /**
     * Address of the user.
     */
    fullAddress: string;
    /**
     * Landmark of the user.
     */
    landmark?: (string) | null;
    /**
     * Last name of the user.
     */
    lastName: string;
    /**
     * Phone number of the user.
     */
    phoneNumber: string;
    /**
     * Postal Code of the user.
     */
    postalCode: number;
    /**
     * State of the user.
     */
    state: string;
};

export type CreateAddressResponse = {
    data: Address;
    message: string;
};

export type ResponseWithMessage = {
    message: string;
};

export type UpdateProfile = {
    full_name: string;
};

export type UserProfile = {
    email: string;
    fullName: string;
    id: string;
    role: UserRole;
};

export enum UserRole {
    ADMIN = 'Admin',
    USER = 'User'
}

export type HealthCheckResponse = (string);

export type HealthCheckError = unknown;

export type ForgotPasswordData = {
    body: AuthForgotPasswordInput;
};

export type ForgotPasswordResponse = (ResponseWithMessage);

export type ForgotPasswordError = (ResponseWithMessage);

export type LoginData = {
    body: AuthLoginInput;
};

export type LoginResponse = (ResponseWithMessage);

export type LoginError = (ResponseWithMessage);

export type LogoutResponse = (ResponseWithMessage);

export type LogoutError = (ResponseWithMessage);

export type RegisterData = {
    body: AuthRegisterInput;
};

export type RegisterResponse = (ResponseWithMessage);

export type RegisterError = (ResponseWithMessage);

export type RegisterVerifyData = {
    body: AuthRegisterVerifyInput;
};

export type RegisterVerifyResponse = (ResponseWithMessage);

export type RegisterVerifyError = (ResponseWithMessage);

export type ResetPasswordData = {
    body: AuthResetPasswordInput;
};

export type ResetPasswordResponse = (ResponseWithMessage);

export type ResetPasswordError = (ResponseWithMessage);

export type GetAddressesResponse = (Array<Address>);

export type GetAddressesError = (ResponseWithMessage);

export type CreateAddressData = {
    body: CreateAddressInput;
};

export type CreateAddressResponse2 = (CreateAddressResponse);

export type CreateAddressError = (ResponseWithMessage);

export type GetAddressData = {
    path: {
        /**
         * Address Id
         */
        id: string;
    };
};

export type GetAddressResponse = (Address);

export type GetAddressError = (ResponseWithMessage);

export type DeleteAddressData = {
    path: {
        /**
         * Address Id
         */
        id: string;
    };
};

export type DeleteAddressResponse = (ResponseWithMessage);

export type DeleteAddressError = (ResponseWithMessage);

export type UpdateAddressData = {
    body: CreateAddressInput;
    path: {
        /**
         * Address Id
         */
        id: string;
    };
};

export type UpdateAddressResponse = (CreateAddressResponse);

export type UpdateAddressError = (ResponseWithMessage);

export type MarkDefaultAddressData = {
    path: {
        /**
         * Address Id
         */
        id: string;
    };
};

export type MarkDefaultAddressResponse = (CreateAddressResponse);

export type MarkDefaultAddressError = (ResponseWithMessage);

export type GetProfileResponse = (UserProfile);

export type GetProfileError = unknown;

export type UpdateProfileData = {
    body: UpdateProfile;
};

export type UpdateProfileResponse = (string);

export type UpdateProfileError = unknown;