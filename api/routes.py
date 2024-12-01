from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import StreamingResponse
from botocore.exceptions import NoCredentialsError, ClientError
# from datetime import timedelta
from dotenv import load_dotenv
from botocore.config import Config
import boto3
import os
from sqlalchemy.orm import Session
from models import Product, Category, ProductImage
from schemas import Product as ProductSchema, ProductCreate
from schemas import ProductPayload
from schemas import Category as CategorySchema
from database import get_db
from datetime import datetime
from typing import List

load_dotenv()
router = APIRouter()

# Load AWS credentials from environment variables or AWS credentials file
S3_BUCKET = "catalogtemplatebucket"
S3_REGION = os.getenv("AWS_REGION", "us-east-2")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=S3_REGION
)

print(os.getenv("AWS_ACCESS_KEY_ID"))


@router.get("/images/{file_name}")
async def get_image(file_name: str):
    try:
        # Obtén el objeto desde S3
        s3_response = s3_client.get_object(Bucket=S3_BUCKET, Key=file_name)

        # Devuelve la imagen como un StreamingResponse
        return StreamingResponse(
            s3_response["Body"],
            media_type=s3_response["ContentType"]
        )
    except ClientError as e:
        print(f"Error al obtener la imagen: {e}")
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
    
@router.post("/upload-files/")
async def upload_files(files: List[UploadFile] = File(...)):
    uploaded_files = []
    try:
        for file in files:
            # Leer el contenido del archivo
            file_content = await file.read()

            # Subir el archivo a S3
            s3_client.put_object(
                Bucket=S3_BUCKET,
                Key=file.filename,
                Body=file_content,
                ContentType=file.content_type
            )

            # Generar una URL pública del archivo (sin firma temporal)
            file_url = {file.filename}
            uploaded_files.append({"filename": file.filename, "url": file_url})

        return {"uploaded_files": uploaded_files}
    
    except ClientError as e:
        print(f"Error al subir los archivos: {e}")
        raise HTTPException(status_code=500, detail="Error al subir los archivos.")


@router.get("/categories", response_model=List[CategorySchema])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()

    # Convertir created_at manualmente a string
    return [
        {
            **category.__dict__,
            "created_at": category.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        for category in categories
    ]

@router.post("/products", response_model=ProductSchema)
def create_product(payload: ProductPayload, db: Session = Depends(get_db)):
    product_data = payload.product
    images = payload.images

    # Verificar que la categoría existe
    category = db.query(Category).filter(Category.id == product_data.category_id).first()
    if not category:
        raise HTTPException(status_code=400, detail="Category does not exist")

    # Crear el producto
    db_product = Product(
        name=product_data.name,
        description=product_data.description,
        price=product_data.price,
        category_id=product_data.category_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    # Crear entradas en `products_images` para cada imagen
    for image_array in images:  # Recorrer los arrays de imágenes
        for image_name in image_array:
            db_image = ProductImage(
                image_key=image_name,  # Nombre de la imagen
                product_id=db_product.id  # Relación con el producto creado
            )
            db.add(db_image)

    db.commit()

    # Obtener las imágenes relacionadas para incluirlas en la respuesta
    related_images = db.query(ProductImage).filter(ProductImage.product_id == db_product.id).order_by(ProductImage.id).all()
    image_keys = [img.image_key for img in related_images]

    return {
        "id": db_product.id,
        "name": db_product.name,
        "description": db_product.description,
        "price": db_product.price,
        "category_id": db_product.category_id,
        "created_at": db_product.created_at.isoformat(),
        "updated_at": db_product.updated_at.isoformat(),
        "images": image_keys,  # Agregar las imágenes a la respuesta
    }

# Listar todos los productos
@router.get("/products", response_model=List[ProductSchema])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    
    # Preparar la respuesta con imágenes
    product_list = []
    for product in products:
        # Obtener las imágenes relacionadas desde ProductImage
        images = db.query(ProductImage).filter(ProductImage.product_id == product.id).order_by(ProductImage.id).all()
        image_keys = [image.image_key for image in images]  # Extraer los nombres de las imágenes

        # Añadir el producto con sus imágenes
        product_list.append({
            **product.__dict__,
            "created_at": product.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": product.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            "images": image_keys  # Agregar las imágenes al producto
        })

    return product_list

# Obtener un producto por ID
@router.get("/products/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    # Consultar el producto
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Obtener las imágenes relacionadas, ordenadas por ID
    images = db.query(ProductImage).filter(ProductImage.product_id == product.id).order_by(ProductImage.id).all()
    image_keys = [image.image_key for image in images]  # Extraer los nombres de las imágenes

    # Construir la respuesta
    return {
        **product.__dict__,
        "created_at": product.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "updated_at": product.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        "images": image_keys  # Agregar las imágenes al producto
    }

# Actualizar un producto
@router.put("/products/{product_id}", response_model=ProductSchema)
def update_product(product_id: int, product: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product.dict().items():
        setattr(db_product, key, value)
    db_product.updated_at = datetime.now()  # Actualizar la fecha de modificación
    db.commit()
    db.refresh(db_product)
    return {
        **db_product.__dict__,
        "created_at": db_product.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "updated_at": db_product.updated_at.strftime("%Y-%m-%d %H:%M:%S")
    }

@router.delete("/products/{product_id}", response_model=dict)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    # Obtener el producto
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Eliminar las imágenes asociadas al producto
    db.query(ProductImage).filter(ProductImage.product_id == product_id).delete()

    # Eliminar el producto
    db.delete(product)
    db.commit()

    return {"message": f"Product with id {product_id} and its images have been deleted successfully."}
