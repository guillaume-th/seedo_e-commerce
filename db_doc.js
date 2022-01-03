/* 

USERS
{
    id : int, 
    email : string, 
    telephone : string, 
    firstname : string, 
    lastname : string, 
    password : string, 
    creation_date : DATE, 
    cvv : string, 
    expiration_CB : string, 
    number_CB : string, 
}

ADRESSES
{
    user_id : int, 
    street : string, 
    number : int, 
    postal_code : int,
    city : string, 
    country : string, 
}
    
ORDERS 
{
    id : int, 
    user_id : int, 
    creation_date : int, 
    order_article_id : int
    status : string,
}

ORDERS_ARTICLES
{
    id : int, 
    id_article : int, 
}

ARTICLES
{
    id: int,
    category_id: int,
    name: string,
    description: string,
    quantity: int,
    price : int, 
    new: bool,
    promo: int,
    weight: int,
    color: string,
    creation_date: DATE,
    updated_date: DATE,
}

COMMENTS 
{
    article_id : int, 
    user_id : int, 
    creation_date : DATE, 
    content : string, 
}

PHOTOS 
{
    article_id : int, 
    img_link : string, 
}

CATEGORIES
{
    id : int, 
    name : string, 
}

*/