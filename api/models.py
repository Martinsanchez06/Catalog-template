from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP, nullable=True)

    # Relación con productos
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    image_url = Column(String(255), nullable=True)  # Campo opcional si se utiliza para una imagen principal
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    created_at = Column(TIMESTAMP, nullable=True)
    updated_at = Column(TIMESTAMP, nullable=True)

    # Relación con la categoría
    category = relationship("Category", back_populates="products")


class ProductImage(Base):
    __tablename__ = "Products_Images"

    id = Column(Integer, primary_key=True, index=True)
    image_key = Column(String, nullable=False)  # Nombre del archivo de imagen
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    # Relación con el producto
    product = relationship("Product")
