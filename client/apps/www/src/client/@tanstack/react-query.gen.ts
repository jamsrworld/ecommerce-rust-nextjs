// This file is auto-generated by @hey-api/openapi-ts

import type { Options } from "@hey-api/client-fetch";
import {
  queryOptions,
  type DefaultError,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  addCartItem,
  changePassword,
  checkoutProduct,
  client,
  continueWithGoogle,
  createAddress,
  deleteAddress,
  forgotPassword,
  getAddress,
  getAddresses,
  getCartData,
  getCheckoutData,
  getOrder,
  getOrders,
  getProduct,
  getProducts,
  getProfile,
  healthCheck,
  login,
  logout,
  logoutAll,
  markDefaultAddress,
  placeOrder,
  proceedCheckout,
  register,
  registerVerify,
  removeCartItem,
  resetPassword,
  updateAddress,
  updateCartItemQuantity,
  updateProfile,
} from "../services.gen";
import type {
  AddCartItemData,
  AddCartItemError,
  AddCartItemResponse,
  CheckoutProductData,
  CheckoutProductError,
  CheckoutProductResponse,
  ContinueWithGoogleData,
  ContinueWithGoogleError,
  ContinueWithGoogleResponse,
  CreateAddressData,
  CreateAddressError,
  CreateAddressResponse,
  DeleteAddressData,
  DeleteAddressError,
  DeleteAddressResponse,
  ForgotPasswordData,
  ForgotPasswordError,
  ForgotPasswordResponse,
  GetAddressData,
  GetOrderData,
  GetProductData,
  LoginData,
  LoginError,
  LoginResponse,
  LogoutError,
  LogoutResponse,
  MarkDefaultAddressData,
  MarkDefaultAddressError,
  MarkDefaultAddressResponse,
  PlaceOrderError,
  PlaceOrderResponse,
  ProceedCheckoutData,
  ProceedCheckoutError,
  ProceedCheckoutResponse,
  RegisterData,
  RegisterError,
  RegisterResponse,
  RegisterVerifyData,
  RegisterVerifyError,
  RegisterVerifyResponse,
  RemoveCartItemData,
  RemoveCartItemError,
  RemoveCartItemResponse,
  ResetPasswordData,
  ResetPasswordError,
  ResetPasswordResponse,
  UpdateAddressData,
  UpdateAddressError,
  UpdateAddressResponse,
  UpdateCartItemQuantityData,
  UpdateCartItemQuantityError,
  UpdateCartItemQuantityResponse,
  UpdateProfileData,
  UpdateProfileError,
  UpdateProfileResponse,
} from "../types.gen";

type QueryKey<TOptions extends Options> = [
  Pick<TOptions, "baseUrl" | "body" | "headers" | "path" | "query"> & {
    _id: string;
    _infinite?: boolean;
  },
];

const createQueryKey = <TOptions extends Options>(
  id: string,
  options?: TOptions,
  infinite?: boolean,
): QueryKey<TOptions>[0] => {
  const params: QueryKey<TOptions>[0] = {
    _id: id,
    baseUrl: (options?.client ?? client).getConfig().baseUrl,
  } as QueryKey<TOptions>[0];
  if (infinite) {
    params._infinite = infinite;
  }
  if (options?.body) {
    params.body = options.body;
  }
  if (options?.headers) {
    params.headers = options.headers;
  }
  if (options?.path) {
    params.path = options.path;
  }
  if (options?.query) {
    params.query = options.query;
  }
  return params;
};

export const healthCheckQueryKey = (options?: Options) => [
  createQueryKey("healthCheck", options),
];

export const healthCheckOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await healthCheck({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: healthCheckQueryKey(options),
  });
};

export const getAddressesQueryKey = (options?: Options) => [
  createQueryKey("getAddresses", options),
];

export const getAddressesOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getAddresses({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getAddressesQueryKey(options),
  });
};

export const createAddressQueryKey = (options: Options<CreateAddressData>) => [
  createQueryKey("createAddress", options),
];

export const createAddressOptions = (options: Options<CreateAddressData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await createAddress({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: createAddressQueryKey(options),
  });
};

export const createAddressMutation = (
  options?: Partial<Options<CreateAddressData>>,
) => {
  const mutationOptions: UseMutationOptions<
    CreateAddressResponse,
    CreateAddressError,
    Options<CreateAddressData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await createAddress({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getAddressQueryKey = (options: Options<GetAddressData>) => [
  createQueryKey("getAddress", options),
];

export const getAddressOptions = (options: Options<GetAddressData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getAddress({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getAddressQueryKey(options),
  });
};

export const deleteAddressMutation = (
  options?: Partial<Options<DeleteAddressData>>,
) => {
  const mutationOptions: UseMutationOptions<
    DeleteAddressResponse,
    DeleteAddressError,
    Options<DeleteAddressData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await deleteAddress({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const updateAddressMutation = (
  options?: Partial<Options<UpdateAddressData>>,
) => {
  const mutationOptions: UseMutationOptions<
    UpdateAddressResponse,
    UpdateAddressError,
    Options<UpdateAddressData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await updateAddress({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const markDefaultAddressMutation = (
  options?: Partial<Options<MarkDefaultAddressData>>,
) => {
  const mutationOptions: UseMutationOptions<
    MarkDefaultAddressResponse,
    MarkDefaultAddressError,
    Options<MarkDefaultAddressData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await markDefaultAddress({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const continueWithGoogleQueryKey = (
  options: Options<ContinueWithGoogleData>,
) => [createQueryKey("continueWithGoogle", options)];

export const continueWithGoogleOptions = (
  options: Options<ContinueWithGoogleData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await continueWithGoogle({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: continueWithGoogleQueryKey(options),
  });
};

export const continueWithGoogleMutation = (
  options?: Partial<Options<ContinueWithGoogleData>>,
) => {
  const mutationOptions: UseMutationOptions<
    ContinueWithGoogleResponse,
    ContinueWithGoogleError,
    Options<ContinueWithGoogleData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await continueWithGoogle({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const forgotPasswordQueryKey = (
  options: Options<ForgotPasswordData>,
) => [createQueryKey("forgotPassword", options)];

export const forgotPasswordOptions = (options: Options<ForgotPasswordData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await forgotPassword({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: forgotPasswordQueryKey(options),
  });
};

export const forgotPasswordMutation = (
  options?: Partial<Options<ForgotPasswordData>>,
) => {
  const mutationOptions: UseMutationOptions<
    ForgotPasswordResponse,
    ForgotPasswordError,
    Options<ForgotPasswordData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await forgotPassword({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const loginQueryKey = (options: Options<LoginData>) => [
  createQueryKey("login", options),
];

export const loginOptions = (options: Options<LoginData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await login({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: loginQueryKey(options),
  });
};

export const loginMutation = (options?: Partial<Options<LoginData>>) => {
  const mutationOptions: UseMutationOptions<
    LoginResponse,
    LoginError,
    Options<LoginData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await login({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const logoutMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<
    LogoutResponse,
    LogoutError,
    Options
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await logout({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const registerQueryKey = (options: Options<RegisterData>) => [
  createQueryKey("register", options),
];

export const registerOptions = (options: Options<RegisterData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await register({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: registerQueryKey(options),
  });
};

export const registerMutation = (options?: Partial<Options<RegisterData>>) => {
  const mutationOptions: UseMutationOptions<
    RegisterResponse,
    RegisterError,
    Options<RegisterData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await register({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const registerVerifyQueryKey = (
  options: Options<RegisterVerifyData>,
) => [createQueryKey("registerVerify", options)];

export const registerVerifyOptions = (options: Options<RegisterVerifyData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await registerVerify({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: registerVerifyQueryKey(options),
  });
};

export const registerVerifyMutation = (
  options?: Partial<Options<RegisterVerifyData>>,
) => {
  const mutationOptions: UseMutationOptions<
    RegisterVerifyResponse,
    RegisterVerifyError,
    Options<RegisterVerifyData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await registerVerify({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const resetPasswordQueryKey = (options: Options<ResetPasswordData>) => [
  createQueryKey("resetPassword", options),
];

export const resetPasswordOptions = (options: Options<ResetPasswordData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await resetPassword({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: resetPasswordQueryKey(options),
  });
};

export const resetPasswordMutation = (
  options?: Partial<Options<ResetPasswordData>>,
) => {
  const mutationOptions: UseMutationOptions<
    ResetPasswordResponse,
    ResetPasswordError,
    Options<ResetPasswordData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await resetPassword({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getCartDataQueryKey = (options?: Options) => [
  createQueryKey("getCartData", options),
];

export const getCartDataOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getCartData({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getCartDataQueryKey(options),
  });
};

export const placeOrderQueryKey = (options?: Options) => [
  createQueryKey("placeOrder", options),
];

export const placeOrderOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await placeOrder({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: placeOrderQueryKey(options),
  });
};

export const placeOrderMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<
    PlaceOrderResponse,
    PlaceOrderError,
    Options
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await placeOrder({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const addCartItemQueryKey = (options: Options<AddCartItemData>) => [
  createQueryKey("addCartItem", options),
];

export const addCartItemOptions = (options: Options<AddCartItemData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await addCartItem({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: addCartItemQueryKey(options),
  });
};

export const addCartItemMutation = (
  options?: Partial<Options<AddCartItemData>>,
) => {
  const mutationOptions: UseMutationOptions<
    AddCartItemResponse,
    AddCartItemError,
    Options<AddCartItemData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await addCartItem({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const updateCartItemQuantityMutation = (
  options?: Partial<Options<UpdateCartItemQuantityData>>,
) => {
  const mutationOptions: UseMutationOptions<
    UpdateCartItemQuantityResponse,
    UpdateCartItemQuantityError,
    Options<UpdateCartItemQuantityData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await updateCartItemQuantity({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const removeCartItemMutation = (
  options?: Partial<Options<RemoveCartItemData>>,
) => {
  const mutationOptions: UseMutationOptions<
    RemoveCartItemResponse,
    RemoveCartItemError,
    Options<RemoveCartItemData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await removeCartItem({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getCheckoutDataQueryKey = (options?: Options) => [
  createQueryKey("getCheckoutData", options),
];

export const getCheckoutDataOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getCheckoutData({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getCheckoutDataQueryKey(options),
  });
};

export const proceedCheckoutQueryKey = (
  options: Options<ProceedCheckoutData>,
) => [createQueryKey("proceedCheckout", options)];

export const proceedCheckoutOptions = (
  options: Options<ProceedCheckoutData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await proceedCheckout({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: proceedCheckoutQueryKey(options),
  });
};

export const proceedCheckoutMutation = (
  options?: Partial<Options<ProceedCheckoutData>>,
) => {
  const mutationOptions: UseMutationOptions<
    ProceedCheckoutResponse,
    ProceedCheckoutError,
    Options<ProceedCheckoutData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await proceedCheckout({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const checkoutProductQueryKey = (
  options: Options<CheckoutProductData>,
) => [createQueryKey("checkoutProduct", options)];

export const checkoutProductOptions = (
  options: Options<CheckoutProductData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await checkoutProduct({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: checkoutProductQueryKey(options),
  });
};

export const checkoutProductMutation = (
  options?: Partial<Options<CheckoutProductData>>,
) => {
  const mutationOptions: UseMutationOptions<
    CheckoutProductResponse,
    CheckoutProductError,
    Options<CheckoutProductData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await checkoutProduct({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getOrdersQueryKey = (options?: Options) => [
  createQueryKey("getOrders", options),
];

export const getOrdersOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getOrders({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getOrdersQueryKey(options),
  });
};

export const getOrderQueryKey = (options: Options<GetOrderData>) => [
  createQueryKey("getOrder", options),
];

export const getOrderOptions = (options: Options<GetOrderData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getOrder({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getOrderQueryKey(options),
  });
};

export const getProductsQueryKey = (options?: Options) => [
  createQueryKey("getProducts", options),
];

export const getProductsOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getProducts({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getProductsQueryKey(options),
  });
};

export const getProductQueryKey = (options: Options<GetProductData>) => [
  createQueryKey("getProduct", options),
];

export const getProductOptions = (options: Options<GetProductData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getProduct({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getProductQueryKey(options),
  });
};

export const getProfileQueryKey = (options?: Options) => [
  createQueryKey("getProfile", options),
];

export const getProfileOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getProfile({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getProfileQueryKey(options),
  });
};

export const updateProfileMutation = (
  options?: Partial<Options<UpdateProfileData>>,
) => {
  const mutationOptions: UseMutationOptions<
    UpdateProfileResponse,
    UpdateProfileError,
    Options<UpdateProfileData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await updateProfile({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const logoutAllMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<void, DefaultError, Options> = {
    mutationFn: async (localOptions) => {
      const { data } = await logoutAll({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const changePasswordMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<void, DefaultError, Options> = {
    mutationFn: async (localOptions) => {
      const { data } = await changePassword({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};
