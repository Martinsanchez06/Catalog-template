from pydantic import BaseModel
from typing import List, Optional

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    created_at: str  # Esto espera un string

    class Config:
        from_attributes = True  # Habilita la compatibilidad con SQLAlchemy

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    # image_url: Optional[List[List[str]]] = None
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductPayload(BaseModel):
    product: ProductCreate
    images: List[List[str]]

class Product(ProductBase):
    id: int
    created_at: str
    updated_at: str
    images: List[str]  # Lista de nombres de las imágenes asociadas

    class Config:
        from_attributes = True  # Habilita compatibilidad con SQLAlchemy

class ProductImage(BaseModel):
    image_key: str
    product_id: int
