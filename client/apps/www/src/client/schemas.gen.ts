// This file is auto-generated by @hey-api/openapi-ts

export const AddressSchema = {
  type: "object",
  required: [
    "id",
    "userId",
    "firstName",
    "lastName",
    "postalCode",
    "city",
    "state",
    "fullAddress",
    "phoneNumber",
    "isDefault",
    "createdAt",
  ],
  properties: {
    city: {
      type: "string",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    firstName: {
      type: "string",
    },
    fullAddress: {
      type: "string",
    },
    id: {
      type: "string",
    },
    isDefault: {
      type: "boolean",
    },
    landmark: {
      type: ["string", "null"],
    },
    lastName: {
      type: "string",
    },
    phoneNumber: {
      type: "string",
    },
    postalCode: {
      type: "integer",
      format: "int32",
    },
    state: {
      type: "string",
    },
    userId: {
      type: "string",
    },
  },
} as const;

export const AddressWithMessageSchema = {
  type: "object",
  required: ["message", "data"],
  properties: {
    data: {
      $ref: "#/components/schemas/Address",
    },
    message: {
      type: "string",
    },
  },
} as const;

export const AuthForgotPasswordInputSchema = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      description: "Email address of the user.",
      example: "princeraj9137@gmail.com",
    },
  },
} as const;

export const AuthLoginInputSchema = {
  type: "object",
  description: "Credentials of the user.",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      description: "Email address of the user.",
      example: "princeraj9137@gmail.com",
    },
    password: {
      type: "string",
      description: "Password of the user.",
      example: "admin790",
    },
  },
} as const;

export const AuthRegisterInputSchema = {
  type: "object",
  required: ["fullName", "email", "password", "confirmPassword"],
  properties: {
    confirmPassword: {
      type: "string",
      description: "Password Confirmation.",
      example: "admin790",
    },
    email: {
      type: "string",
      description: "Email address of the user.",
      example: "princeraj9137@gmail.com",
    },
    fullName: {
      type: "string",
      description: "Full name of the user.",
      example: "Jamsr World",
    },
    password: {
      type: "string",
      description: `Password of the user.
Min. 8 characters.`,
      example: "admin790",
    },
  },
} as const;

export const AuthRegisterVerifyInputSchema = {
  allOf: [
    {
      $ref: "#/components/schemas/AuthRegisterInput",
      description: "The original Register struct fields.",
    },
    {
      type: "object",
      required: ["code"],
      properties: {
        code: {
          type: "integer",
          format: "int32",
          description: "Verification code (OTP).",
          example: 1234,
          minimum: 0,
        },
      },
    },
  ],
} as const;

export const AuthResetPasswordInputSchema = {
  type: "object",
  required: ["email", "otp", "password", "confirmPassword"],
  properties: {
    confirmPassword: {
      type: "string",
      description: "Password Confirmation.",
      example: "admin790",
    },
    email: {
      type: "string",
      description: "Email address of the user.",
      example: "princeraj9137@gmail.com",
    },
    otp: {
      type: "integer",
      format: "int32",
      description: "Verification code (OTP).",
      example: 1234,
      minimum: 0,
    },
    password: {
      type: "string",
      description: "New Password to set.",
      example: "admin790",
    },
  },
} as const;

export const CartSchema = {
  type: "object",
  required: ["id", "productId", "userId", "quantity", "createdAt"],
  properties: {
    createdAt: {
      type: "string",
      format: "date-time",
    },
    id: {
      type: "string",
    },
    productId: {
      type: "string",
    },
    quantity: {
      type: "integer",
      format: "int32",
    },
    userId: {
      type: "string",
    },
  },
} as const;

export const CartItemWithMessageSchema = {
  type: "object",
  required: ["data", "message"],
  properties: {
    data: {
      $ref: "#/components/schemas/Cart",
    },
    message: {
      type: "string",
    },
  },
} as const;

export const CartItemsWithProductSchema = {
  type: "object",
  required: ["id", "product_id", "quantity", "product"],
  properties: {
    id: {
      type: "string",
    },
    product: {
      $ref: "#/components/schemas/RelationProductItem",
    },
    product_id: {
      type: "string",
    },
    quantity: {
      type: "integer",
      format: "int32",
    },
  },
} as const;

export const CartUpdateQuantityInputSchema = {
  type: "object",
  required: ["quantity"],
  properties: {
    quantity: {
      type: "integer",
      format: "int32",
    },
  },
} as const;

export const CartUserDataSchema = {
  type: "object",
  required: ["count", "totalAmount", "items"],
  properties: {
    count: {
      type: "integer",
      format: "int64",
    },
    items: {
      type: "array",
      items: {
        $ref: "#/components/schemas/CartItemsWithProduct",
      },
    },
    totalAmount: {
      type: "number",
      format: "double",
    },
  },
} as const;

export const ChangePasswordInputSchema = {
  type: "object",
  required: ["currentPassword", "newPassword", "confirmPassword"],
  properties: {
    confirmPassword: {
      type: "string",
    },
    currentPassword: {
      type: "string",
    },
    newPassword: {
      type: "string",
    },
  },
} as const;

export const CheckoutItemsWithProductSchema = {
  type: "object",
  required: ["id", "product_id", "quantity", "product"],
  properties: {
    id: {
      type: "string",
    },
    product: {
      $ref: "#/components/schemas/RelationProductItem",
    },
    product_id: {
      type: "string",
    },
    quantity: {
      type: "integer",
      format: "int32",
    },
  },
} as const;

export const CheckoutUserDataSchema = {
  type: "object",
  required: ["count", "totalAmount", "items", "addresses"],
  properties: {
    addresses: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Address",
      },
    },
    count: {
      type: "integer",
      format: "int64",
    },
    items: {
      type: "array",
      items: {
        $ref: "#/components/schemas/CheckoutItemsWithProduct",
      },
    },
    totalAmount: {
      type: "number",
      format: "double",
    },
  },
} as const;

export const ContinueWithGoogleInputSchema = {
  oneOf: [
    {
      $ref: "#/components/schemas/GoogleLoginWithCredential",
    },
    {
      $ref: "#/components/schemas/GoogleLoginWithCode",
    },
  ],
} as const;

export const CreateAddressInputSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "phoneNumber",
    "fullAddress",
    "city",
    "state",
    "postalCode",
  ],
  properties: {
    city: {
      type: "string",
      description: "City of the user.",
      maxLength: 50,
      minLength: 1,
    },
    firstName: {
      type: "string",
      description: "First name of the user.",
      example: "John",
      maxLength: 20,
      minLength: 1,
    },
    fullAddress: {
      type: "string",
      description: "Address of the user.",
      maxLength: 300,
      minLength: 1,
    },
    landmark: {
      type: ["string", "null"],
      description: "Landmark of the user.",
      maxLength: 200,
      minLength: 1,
    },
    lastName: {
      type: "string",
      description: "Last name of the user.",
      example: "Doe",
      maxLength: 20,
      minLength: 1,
    },
    phoneNumber: {
      type: "string",
      description: "Phone number of the user.",
      example: "1234567890",
      maxLength: 10,
      minLength: 1,
    },
    postalCode: {
      type: "integer",
      format: "int32",
      description: "Postal Code of the user.",
      example: 123456,
      maximum: 999999,
      minimum: 100000,
    },
    state: {
      type: "string",
      description: "State of the user.",
      maxLength: 50,
      minLength: 1,
    },
  },
} as const;

export const GoogleLoginWithCodeSchema = {
  type: "object",
  required: ["authorizationCode"],
  properties: {
    authorizationCode: {
      type: "string",
    },
  },
} as const;

export const GoogleLoginWithCredentialSchema = {
  type: "object",
  required: ["credential"],
  properties: {
    credential: {
      type: "string",
    },
  },
} as const;

export const ImageSchema = {
  type: "object",
  required: ["name", "url", "placeholder", "width", "height"],
  properties: {
    height: {
      type: "integer",
      format: "int32",
    },
    name: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    url: {
      type: "string",
    },
    width: {
      type: "integer",
      format: "int32",
    },
  },
} as const;

export const OrderSchema = {
  type: "object",
  required: [
    "id",
    "productId",
    "userId",
    "quantity",
    "status",
    "paymentMethod",
    "address",
    "createdAt",
    "updatedAt",
  ],
  properties: {
    address: {
      $ref: "#/components/schemas/OrderAddress",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    id: {
      type: "string",
    },
    paymentMethod: {
      $ref: "#/components/schemas/PaymentMethod",
    },
    productId: {
      type: "string",
    },
    quantity: {
      type: "integer",
      format: "int32",
    },
    status: {
      $ref: "#/components/schemas/OrderStatus",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
    userId: {
      type: "string",
    },
  },
} as const;

export const OrderAddressSchema = {
  type: "object",
  required: [
    "first_name",
    "last_name",
    "postal_code",
    "city",
    "state",
    "full_address",
    "phone_number",
  ],
  properties: {
    city: {
      type: "string",
    },
    first_name: {
      type: "string",
    },
    full_address: {
      type: "string",
    },
    landmark: {
      type: ["string", "null"],
    },
    last_name: {
      type: "string",
    },
    phone_number: {
      type: "string",
    },
    postal_code: {
      type: "integer",
      format: "int32",
    },
    state: {
      type: "string",
    },
  },
} as const;

export const OrderStatusSchema = {
  type: "string",
  enum: ["Pending", "Success"],
} as const;

export const OrderWithPaginationSchema = {
  type: "object",
  required: ["orders", "totalRecords"],
  properties: {
    orders: {
      type: "array",
      items: {
        $ref: "#/components/schemas/OrderWithProduct",
      },
    },
    totalRecords: {
      type: "integer",
      format: "int64",
      minimum: 0,
    },
  },
} as const;

export const OrderWithProductSchema = {
  type: "object",
  required: ["order", "product"],
  properties: {
    order: {
      $ref: "#/components/schemas/Order",
    },
    product: {
      $ref: "#/components/schemas/RelationProductItem",
    },
  },
} as const;

export const PaginationQuerySchema = {
  type: "object",
  properties: {
    page: {
      type: ["integer", "null"],
      format: "int32",
      minimum: 0,
    },
    page_size: {
      type: ["integer", "null"],
      format: "int32",
      minimum: 0,
    },
  },
} as const;

export const PaymentMethodSchema = {
  type: "string",
  enum: ["Btcpay", "Nowpayments", "Paypal"],
} as const;

export const ProceedCheckoutInputSchema = {
  type: "object",
  required: ["paymentMethod", "addressId"],
  properties: {
    addressId: {
      type: "string",
    },
    paymentMethod: {
      $ref: "#/components/schemas/PaymentMethod",
    },
  },
} as const;

export const ProductSchema = {
  type: "object",
  required: [
    "id",
    "title",
    "slug",
    "description",
    "category",
    "brand",
    "color",
    "size",
    "style",
    "highlights",
    "images",
    "isReturnable",
    "maximumOrder",
    "minimumOrder",
    "mrp",
    "price",
    "seo",
    "skuId",
    "status",
    "stock",
    "tags",
    "video",
    "createdAt",
    "updatedAt",
  ],
  properties: {
    brand: {
      type: "string",
    },
    category: {
      type: "string",
    },
    color: {
      type: "string",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    description: {
      $ref: "#/components/schemas/Value",
    },
    highlights: {
      $ref: "#/components/schemas/ProductHighlights",
    },
    id: {
      type: "string",
    },
    images: {
      $ref: "#/components/schemas/ProductImages",
    },
    isReturnable: {
      type: "boolean",
    },
    maximumOrder: {
      type: "integer",
      format: "int32",
    },
    minimumOrder: {
      type: "integer",
      format: "int32",
    },
    mrp: {
      type: "number",
      format: "double",
    },
    price: {
      type: "number",
      format: "double",
    },
    seo: {
      $ref: "#/components/schemas/ProductSeo",
    },
    size: {
      type: "string",
    },
    skuId: {
      type: "string",
    },
    slug: {
      type: "string",
    },
    status: {
      $ref: "#/components/schemas/ProductStatus",
    },
    stock: {
      type: "integer",
      format: "int32",
    },
    style: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    title: {
      type: "string",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
    video: {
      $ref: "#/components/schemas/ProductVideo",
    },
  },
} as const;

export const ProductHighlightSchema = {
  type: "object",
  required: ["highlight"],
  properties: {
    highlight: {
      type: "string",
    },
  },
} as const;

export const ProductHighlightsSchema = {
  type: "array",
  items: {
    $ref: "#/components/schemas/ProductHighlight",
  },
} as const;

export const ProductImagesSchema = {
  type: "array",
  items: {
    $ref: "#/components/schemas/Image",
  },
} as const;

export const ProductSeoSchema = {
  type: "object",
  required: ["title", "description", "keywords"],
  properties: {
    description: {
      type: "string",
    },
    keywords: {
      type: "array",
      items: {
        type: "string",
      },
    },
    title: {
      type: "string",
    },
  },
} as const;

export const ProductStatusSchema = {
  type: "string",
  enum: ["Private", "Public", "Unlisted"],
} as const;

export const ProductVideoSchema = {
  type: "object",
  required: ["url", "thumbnail"],
  properties: {
    thumbnail: {
      $ref: "#/components/schemas/Image",
    },
    url: {
      type: "string",
    },
  },
} as const;

export const RelationProductItemSchema = {
  type: "object",
  required: [
    "id",
    "title",
    "slug",
    "brand",
    "color",
    "size",
    "style",
    "images",
    "mrp",
    "price",
  ],
  properties: {
    brand: {
      type: "string",
    },
    color: {
      type: "string",
    },
    id: {
      type: "string",
    },
    images: {
      $ref: "#/components/schemas/ProductImages",
    },
    mrp: {
      type: "number",
      format: "double",
    },
    price: {
      type: "number",
      format: "double",
    },
    size: {
      type: "string",
    },
    slug: {
      type: "string",
    },
    style: {
      type: "string",
    },
    title: {
      type: "string",
    },
  },
} as const;

export const ResponseWithMessageSchema = {
  type: "object",
  required: ["message"],
  properties: {
    message: {
      type: "string",
    },
  },
} as const;

export const ResponseWithSuccessSchema = {
  type: "object",
  required: ["success"],
  properties: {
    success: {
      type: "boolean",
    },
  },
} as const;

export const UpdateProfileInputSchema = {
  type: "object",
  required: ["fullName"],
  properties: {
    fullName: {
      type: "string",
    },
  },
} as const;

export const UserProfileSchema = {
  type: "object",
  required: ["id", "email", "fullName", "role"],
  properties: {
    email: {
      type: "string",
    },
    fullName: {
      type: "string",
    },
    id: {
      type: "string",
    },
    role: {
      $ref: "#/components/schemas/UserRole",
    },
  },
} as const;

export const UserRoleSchema = {
  type: "string",
  enum: ["Admin", "User"],
} as const;

export const ValueSchema = {} as const;
