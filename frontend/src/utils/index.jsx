const BASE_URL = "https://inventorymanagement-uxhb.onrender.com"; 

export const API = {
  AUTH: {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    USER: `${BASE_URL}/user`,
  },
  PRODUCTS: {
    ADD: `${BASE_URL}/products`,
    UPDATE: (id) => `${BASE_URL}/products/${id}`,
    GET_ALL: `${BASE_URL}/products`,
    GET_ONE: (id) => `${BASE_URL}/products/${id}`,
    LOW_STOCK: `${BASE_URL}/products/low-stock`,
  },
  ANALYTICS: {
    TOP_PRODUCTS: `${BASE_URL}/analytics/top-products`,
    TOP_TYPES: `${BASE_URL}/analytics/top-types`,
    STOCK_SUMMARY: `${BASE_URL}/analytics/stock-summary`,
    RECENT_PRODUCTS: `${BASE_URL}/analytics/recent`,
  },
};
