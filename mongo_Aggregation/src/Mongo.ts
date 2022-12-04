import {MongoClient} from 'mongodb';

const runQueries = async() => {
    const mongo = await MongoClient.connect('mongodb://localhost:27017');

    const restaurant = mongo.db('restaurant').collection('restaurant');
    const query1 = {
        name:/.*Reg.*/
    };
    const filter = {"restaurant_id":1,"name":1,"borough":1,"cuisine":1};
    const Regs = await restaurant.find({"name":/.*Reg.*/})
    .toArray();
    console.log(Regs)

    const query2 = {
        "borough": "Bronx",
        $or : [
            {"cuisine": "American"},
            {"cuisine": "Chinese"}
        ]
    };

    restaurant.find(query2)
    .toArray();
    mongo.close();
}

runQueries();
