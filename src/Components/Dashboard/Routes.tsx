const routes = {
    admin: [
      { path: "/admin/categoryPage", label: "CategoryPage" },
      { path: "/admin/dashboard", label: "Dashboard" },
      { path: "/admin/productView/:productId", label: "ProductView" },
      { path: "/admin/products", label: "Products" },
      { path: "/admin/productsAdd", label: "ProductsAdd" },
      { path: "/admin/addRestaurants", label: "AddRestaurants" },
      { path: "/admin/restaurants", label: "Restaurants" },
      { path: "/admin/team", label: "Our Team" },
    ],
    seller: [
      { path: "/seller/", label: "CategoryPage" },
      { path: "/seller/dashboard", label: "Dashboard" },
      { path: "/seller/businessDetail", label: "BusinessDetail" },
      { path: "/seller/orders", label: "Orders" },
      { path: "/seller/products", label: "Products" },
      { path: "/seller/productView/:productId", label: "ProductView" },
      { path: "/seller/productAdd", label: "ProductAdd" },
      { path: "/seller/coupons", label: "Coupons" },
      { path: "/seller/couponAdd", label: "CouponAdd" },
      { path: "/seller/couponview/:couponId", label: "CouponView" },
    ],
    customer: [
      { path: "/customer/", label: "Homepage" },
    ],
  };