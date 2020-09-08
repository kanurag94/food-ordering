# food-ordering

Food ordering in nodejs, mysql

Live at https://food-ordering-react.herokuapp.com/

How to Run?

`npm start` in root directory.

## API Routes

The api currently has 4 major routes:

1. Authentication Route
2. Orders Route
3. Products Route
4. Users Route (Not being used currently)

Lets define these routes one by one:

1. Authentication Route

Available in `app/routes/auth.route.js`

- Sign Up route: `/api/auth/signup` type = `POST`

Request format
{
username: STRING,
password: STRING (>7 length),
email: STRING,
}

Accessible by: public

- Sign Up Custom route: `/api/auth/signupcustom` type = `POST`

Request format
{
username: STRING,
password: STRING (>7 length),
email: STRING,
roles: STRING ("staff", "admin", "user"),
}

Accessible by: admin

- Sign in route: `/api/auth/signin` type = `POST`

Request format
{
username: STRING,
password: STRING (>7 length),
}

Accessible by: registered users

2. Orders Route

- Create route: `/api/orders/new` type = `POST`

Request format

{
itemId: id of item purchased,
userId: userID making request,
amount: auto updated through item id,
orderPincode: req.body.orderPincode,
staffId: auto assigned,
eta: calculateEta(req),
isComplete: false,
}

Accessible by: registered users

- Get order details route: `/api/orders/:orderId` type = `GET`

Request format
{
id: req.params.orderID
}

Accessible by: users

- Get all orders: `/api/orders` type = `POST`

Lists all orders

Accessible by: admin (everyone's order), user and staff

- Fulfil a order: `/api/orders/:orderId` type = `POST`

Fulfils a order (marks isComplete = True)

{
id: req.params.orderId
}

Accessible by: admin (everyone's order), and staff

3. Products Route

- Create a product route: `/api/products/new` type= `POST`

Request format

{
name: req.body.name,
imageUrl: req.body.imageUrl,
price: req.body.price,
quantity: req.body.quantity,
}

Accessible by admin

- Get product details route: `/api/products/:itemId` type = `GET`

Request format
{
id: req.params.itemId
}

Accessible by: public

- Get all products: `/api/products` type = `GET`

Lists all products

Accessible by: public

- Delete a product: `/api/products/:itemId` type = `DELETE`

{
id: req.params.itemId
}

Deletes a product

{
id: req.params.orderId
}

Accessible by: admin

- Update a product: `api/products/:itemId

Updates a product

Request format

{
itemId: req.body.itemID
name: req.body.name,
imageUrl: req.body.imageUrl,
price: req.body.price,
quantity: req.body.quantity,
}

Accessible by admin
