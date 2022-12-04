import {MongoClient} from 'mongodb';

const runQueries = async() => {
    const mongo = await MongoClient.connect('mongodb://localhost:27017');

    const restaurant = mongo.db('restaurant').collection('restaurant');
    const query1 = {
        name:/.*Reg.*/,
    };
    const filter = {"restaurant_id":1,"name":1,"borough":1,"cuisine":1};
    const Regs = await restaurant.find({"name":/.*Reg.*/}).project(filter)
    .toArray();
    console.log(Regs)

    const query2 = {
        "borough": "Bronx",
        $or : [
            {"cuisine": "American"},
            {"cuisine": "Chinese"}
        ]
    };

    const q2 = await restaurant.find(query2)
    .toArray();
    console.log(q2);
    // mongo.close();
}

runQueries();
