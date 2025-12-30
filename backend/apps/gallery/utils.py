import cloudinary.uploader

# For Image upload
def upload_to_cloudinary(file, folder="content_hive_blog_data"):
    result = cloudinary.uploader.upload(file, folder=folder, resource_type="raw")
    return result["secure_url"]
