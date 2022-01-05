// GET articles => https://localhost:5000/articles
Response =
{
    id: int,
    category_id: int,
    name: string,
    description: string,
    quantity: int,
    new: bool,
    promo: int,
    weight: int,
    color: string,
    creation_date: DATE,
    updated_date: DATE,
}

// POST connection 
Request =
{
    body : {
        email : string, 
        password : string, 
    }
}

Response =
{
    status : "ok|wrong password|wrong username"
}

//POST inscription
Request = 
{
    body : {
        firstname : string, 
        lastname : string, 
        email : string, 
        password : string, 
        confirm_password : string, 
    }
}

Response =
{
    status : "ok|email taken|passwords don't match"
}

