export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
