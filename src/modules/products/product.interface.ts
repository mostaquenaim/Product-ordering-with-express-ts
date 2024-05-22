
// Variant Interface
export interface TVariant {
    type: string;
    value: string;
  }
  
  // Inventory Interface
  export interface TInventory {
    quantity: number;
    inStock: boolean;
  }
  
  // Product Interface
  export interface TProduct {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: TVariant[];
    inventory: TInventory;
  }
  
