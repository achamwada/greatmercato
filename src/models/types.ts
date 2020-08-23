interface timestamps {
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductCategory extends timestamps {
  title: string;
  description: string;
  hero: string;
  slug?: string;
}
export interface ISeller extends timestamps {
  firstname: string;
  lastname: string;
  title: string;
  phonenumber: string;
  email: string;
  password: string;
  account_type: string;
  provider: string;
}
export interface IReview extends timestamps {
  title: string;
  description: string;
  avatar: string;
}
export interface IProductImage extends timestamps {
  title: string;
  lg_url: string;
  md_url: string;
  sm_url: string;
}
export interface IProduct extends timestamps {
  title: string;
  hero_img: string;
  price: number;
  description: string;
  excerpt: string;
  sku: string;
  seller: string;
  instock: boolean;
  rating: number;
  vat: number;
  quantity: number;
  return_policy: string;
  condition: string;
  location: string;
  click_and_collect: boolean;
  product_category: string;
  reviews: string[];
  gallery: string[];
}
