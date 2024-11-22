// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
} from "@hey-api/client-fetch";
import {
  type HealthCheckError,
  type HealthCheckResponse,
  type GetAddressesError,
  type GetAddressesResponse,
  type CreateAddressData,
  type CreateAddressError,
  type CreateAddressResponse,
  type GetAddressData,
  type GetAddressError,
  type GetAddressResponse,
  type DeleteAddressData,
  type DeleteAddressError,
  type DeleteAddressResponse,
  type UpdateAddressData,
  type UpdateAddressError,
  type UpdateAddressResponse,
  type MarkDefaultAddressData,
  type MarkDefaultAddressError,
  type MarkDefaultAddressResponse,
  type ContinueWithGoogleData,
  type ContinueWithGoogleError,
  type ContinueWithGoogleResponse,
  type ForgotPasswordData,
  type ForgotPasswordError,
  type ForgotPasswordResponse,
  type LoginData,
  type LoginError,
  type LoginResponse,
  type LogoutError,
  type LogoutResponse,
  type RegisterData,
  type RegisterError,
  type RegisterResponse,
  type RegisterVerifyData,
  type RegisterVerifyError,
  type RegisterVerifyResponse,
  type ResetPasswordData,
  type ResetPasswordError,
  type ResetPasswordResponse,
  type GetCartDataError,
  type GetCartDataResponse,
  type PlaceOrderError,
  type PlaceOrderResponse,
  type AddCartItemData,
  type AddCartItemError,
  type AddCartItemResponse,
  type UpdateCartItemQuantityData,
  type UpdateCartItemQuantityError,
  type UpdateCartItemQuantityResponse,
  type RemoveCartItemData,
  type RemoveCartItemError,
  type RemoveCartItemResponse,
  type GetCheckoutDataError,
  type GetCheckoutDataResponse,
  type ProceedCheckoutData,
  type ProceedCheckoutError,
  type ProceedCheckoutResponse,
  type CheckoutProductData,
  type CheckoutProductError,
  type CheckoutProductResponse,
  type GetOrdersData,
  type GetOrdersError,
  type GetOrdersResponse,
  type GetOrderData,
  type GetOrderError,
  type GetOrderResponse,
  type GetProductsError,
  type GetProductsResponse,
  type GetProductData,
  type GetProductError,
  type GetProductResponse,
  type GetProfileError,
  type GetProfileResponse,
  type UpdateProfileData,
  type UpdateProfileError,
  type UpdateProfileResponse,
  type ChangePasswordData,
  type ChangePasswordError,
  type ChangePasswordResponse,
  GetAddressesResponseTransformer,
  CreateAddressResponseTransformer,
  GetAddressResponseTransformer,
  UpdateAddressResponseTransformer,
  MarkDefaultAddressResponseTransformer,
  AddCartItemResponseTransformer,
  UpdateCartItemQuantityResponseTransformer,
  GetCheckoutDataResponseTransformer,
  GetOrdersResponseTransformer,
  GetOrderResponseTransformer,
  GetProductsResponseTransformer,
  GetProductResponseTransformer,
} from "./types.gen";

import { client } from "../utils/client";

export { client } from "../utils/client" 

/**
 * Health check
 */
export const healthCheck = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    HealthCheckResponse,
    HealthCheckError,
    ThrowOnError
  >({
    ...options,
    url: "/",
  });
};

/**
 * Get All Addresses
 */
export const getAddresses = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetAddressesResponse,
    GetAddressesError,
    ThrowOnError
  >({
    ...options,
    url: "/addresses",
    responseTransformer: GetAddressesResponseTransformer,
  });
};

/**
 * Create An Address
 */
export const createAddress = <ThrowOnError extends boolean = false>(
  options: Options<CreateAddressData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateAddressResponse,
    CreateAddressError,
    ThrowOnError
  >({
    ...options,
    url: "/addresses",
    responseTransformer: CreateAddressResponseTransformer,
  });
};

/**
 * Get an Address
 */
export const getAddress = <ThrowOnError extends boolean = false>(
  options: Options<GetAddressData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetAddressResponse,
    GetAddressError,
    ThrowOnError
  >({
    ...options,
    url: "/addresses/{id}",
    responseTransformer: GetAddressResponseTransformer,
  });
};

/**
 * Delete An Address
 */
export const deleteAddress = <ThrowOnError extends boolean = false>(
  options: Options<DeleteAddressData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteAddressResponse,
    DeleteAddressError,
    ThrowOnError
  >({
    ...options,
    url: "/addresses/{id}",
  });
};

/**
 * Update An Address
 */
export const updateAddress = <ThrowOnError extends boolean = false>(
  options: Options<UpdateAddressData, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateAddressResponse,
    UpdateAddressError,
    ThrowOnError
  >({
    ...options,
    url: "/addresses/{id}",
    responseTransformer: UpdateAddressResponseTransformer,
  });
};

/**
 * Mark Default Address
 */
export const markDefaultAddress = <ThrowOnError extends boolean = false>(
  options: Options<MarkDefaultAddressData, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    MarkDefaultAddressResponse,
    MarkDefaultAddressError,
    ThrowOnError
  >({
    ...options,
    url: "/addresses/{id}/default",
    responseTransformer: MarkDefaultAddressResponseTransformer,
  });
};

/**
 * Continue with google
 * Api to login or register with google
 */
export const continueWithGoogle = <ThrowOnError extends boolean = false>(
  options: Options<ContinueWithGoogleData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    ContinueWithGoogleResponse,
    ContinueWithGoogleError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/continue-with-google",
  });
};

/**
 * Forgot Password
 */
export const forgotPassword = <ThrowOnError extends boolean = false>(
  options: Options<ForgotPasswordData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    ForgotPasswordResponse,
    ForgotPasswordError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/forgot-password",
  });
};

/**
 * Login
 * Api to login for user
 */
export const login = <ThrowOnError extends boolean = false>(
  options: Options<LoginData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    LoginResponse,
    LoginError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/login",
  });
};

/**
 * Logout
 */
export const logout = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    LogoutResponse,
    LogoutError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/logout",
  });
};

/**
 * Register
 */
export const register = <ThrowOnError extends boolean = false>(
  options: Options<RegisterData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    RegisterResponse,
    RegisterError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/register",
  });
};

/**
 * Register Verification
 */
export const registerVerify = <ThrowOnError extends boolean = false>(
  options: Options<RegisterVerifyData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    RegisterVerifyResponse,
    RegisterVerifyError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/register/verify",
  });
};

/**
 * Reset Password
 */
export const resetPassword = <ThrowOnError extends boolean = false>(
  options: Options<ResetPasswordData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    ResetPasswordResponse,
    ResetPasswordError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/reset-password",
  });
};

/**
 * Get all cart items
 */
export const getCartData = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetCartDataResponse,
    GetCartDataError,
    ThrowOnError
  >({
    ...options,
    url: "/carts",
  });
};

/**
 * Place order
 */
export const placeOrder = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PlaceOrderResponse,
    PlaceOrderError,
    ThrowOnError
  >({
    ...options,
    url: "/carts/place_order",
  });
};

/**
 * Add product to cart
 */
export const addCartItem = <ThrowOnError extends boolean = false>(
  options: Options<AddCartItemData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    AddCartItemResponse,
    AddCartItemError,
    ThrowOnError
  >({
    ...options,
    url: "/carts/product/{id}",
    responseTransformer: AddCartItemResponseTransformer,
  });
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCartItemQuantityData, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateCartItemQuantityResponse,
    UpdateCartItemQuantityError,
    ThrowOnError
  >({
    ...options,
    url: "/carts/quantity/{id}",
    responseTransformer: UpdateCartItemQuantityResponseTransformer,
  });
};

/**
 * Remove cart item
 */
export const removeCartItem = <ThrowOnError extends boolean = false>(
  options: Options<RemoveCartItemData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    RemoveCartItemResponse,
    RemoveCartItemError,
    ThrowOnError
  >({
    ...options,
    url: "/carts/{id}",
  });
};

/**
 * Get all checkout items
 */
export const getCheckoutData = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetCheckoutDataResponse,
    GetCheckoutDataError,
    ThrowOnError
  >({
    ...options,
    url: "/checkouts",
    responseTransformer: GetCheckoutDataResponseTransformer,
  });
};

/**
 * Proceed checkout
 */
export const proceedCheckout = <ThrowOnError extends boolean = false>(
  options: Options<ProceedCheckoutData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    ProceedCheckoutResponse,
    ProceedCheckoutError,
    ThrowOnError
  >({
    ...options,
    url: "/checkouts",
  });
};

/**
 * Checkout Product
 */
export const checkoutProduct = <ThrowOnError extends boolean = false>(
  options: Options<CheckoutProductData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CheckoutProductResponse,
    CheckoutProductError,
    ThrowOnError
  >({
    ...options,
    url: "/checkouts/product/{id}",
  });
};

/**
 * Get all orders
 */
export const getOrders = <ThrowOnError extends boolean = false>(
  options?: Options<GetOrdersData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetOrdersResponse,
    GetOrdersError,
    ThrowOnError
  >({
    ...options,
    url: "/orders",
    responseTransformer: GetOrdersResponseTransformer,
  });
};

/**
 * Get order
 */
export const getOrder = <ThrowOnError extends boolean = false>(
  options: Options<GetOrderData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetOrderResponse,
    GetOrderError,
    ThrowOnError
  >({
    ...options,
    url: "/orders/{id}",
    responseTransformer: GetOrderResponseTransformer,
  });
};

/**
 * Get all Products
 */
export const getProducts = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetProductsResponse,
    GetProductsError,
    ThrowOnError
  >({
    ...options,
    url: "/products",
    responseTransformer: GetProductsResponseTransformer,
  });
};

/**
 * Get a Product
 */
export const getProduct = <ThrowOnError extends boolean = false>(
  options: Options<GetProductData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetProductResponse,
    GetProductError,
    ThrowOnError
  >({
    ...options,
    url: "/products/product/{id}",
    responseTransformer: GetProductResponseTransformer,
  });
};

/**
 * Get Profile
 */
export const getProfile = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetProfileResponse,
    GetProfileError,
    ThrowOnError
  >({
    ...options,
    url: "/profile",
  });
};

/**
 * Update Profile
 */
export const updateProfile = <ThrowOnError extends boolean = false>(
  options: Options<UpdateProfileData, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateProfileResponse,
    UpdateProfileError,
    ThrowOnError
  >({
    ...options,
    url: "/profile",
  });
};

/**
 * Logout All
 */
export const logoutAll = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<void, unknown, ThrowOnError>({
    ...options,
    url: "/profile/logout-all",
  });
};

/**
 * Change Password
 */
export const changePassword = <ThrowOnError extends boolean = false>(
  options: Options<ChangePasswordData, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    ChangePasswordResponse,
    ChangePasswordError,
    ThrowOnError
  >({
    ...options,
    url: "/profile/password",
  });
};
