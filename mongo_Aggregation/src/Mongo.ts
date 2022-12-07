import {MongoClient} from 'mongodb';

const runQueries = async() => {
    const mongo = await MongoClient.connect('mongodb://localhost:27017');

    const restaurant = mongo.db('restaurant').collection('restaurant');
    const query1 = {name:/.*Reg.*/,};

    const filter1 = {"restaurant_id":1,"name":1,"borough":1,"cuisine":1};
    const q1 = await restaurant.find(query1).project(filter1)
    .toArray();
    // console.log(q1)

    const query2 = {
        "borough": "Bronx",
        $or : [
            {"cuisine": "American"},
            {"cuisine": "Chinese"}
        ]
    };

    const q2 = await restaurant.find(query2)
    .toArray();
    // console.log(q2);

    const query3 ={ "borough": { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } }
    const q3 = await  restaurant.find(query3)
        .toArray()
    // console.log(q3)

    const query4 = { "borough": { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } }
    const q4 = await  restaurant.find(query4)
        .toArray()
    // console.log(q4)

    const query5 = {"grades.score":{$not:{ $gt: 10 }}}
    const q5 = await  restaurant.find(query5)
        .toArray()
    // console.log(q5)

    const query6 = {$or: [{name: /^Wil/}, 
        {$and: [{"cuisine" : {$ne :"American "}}, {"cuisine" : {$ne :"Chinees"}}]}
      ]}
    const q6 = await  restaurant.find(query6)
        .toArray()
    // console.log(q6)

    const query7 = {
                "grades.date": ("2014-08-11T00:00:00Z"), 
                "grades.grade":"A" , 
                "grades.score" : 11
               }
    // const q7 = await  restaurant.find(query7)
    //     .toArray()
    // console.log(q7)

    // const q8 = await  restaurant.find(
    //     { "grades.1.date": ISODate("2014-08-11T00:00:00Z"), 
    //                     "grades.1.grade":"A" , 
    //                     "grades.1.score" : 9
    //                   },
    // )
    //     .toArray()
    // console.log(q8)

    const query9 = { 
        "address.coord.1": {$gt : 42, $lte : 52}
    }
    const q9 = await  restaurant.find(query9)
        .toArray()
        // console.log(q9)

    const q10 = await  restaurant.find().sort({"name":1})
        .toArray()
    // console.log(q10)

    const q11 = await  restaurant.find().sort({"name":-1})
            .toArray()
    // console.log(q11)

    const q12 = await  restaurant.find().sort({"cuisine":1,"borough" : -1,})
       .toArray()
    //    console.log(q12)

    const query13 = {"address.street" : { $exists : true }}
    const q13 = await  restaurant.find(query13)
    .toArray()
    console.log(q13)

    mongo.close();
}

runQueries();

// const runQuery = async () => {
//     const mongo = await MongoClient.connect('mongodb://localhost:27017');
//     const  restaurant = mongo.db('Restuarant').collection('restuarants');
//     const one = await  restaurant.find(
//         { "name": /.*Reg.*/ },
//     )
//         .toArray()
//     // console.log(one)
//     const two = await  restaurant.find(
//         {
//             "borough": "Bronx",
//             $or: [
//                 { "cuisine": "American " },
//                 { "cuisine": "Chinese" }
//             ]
//         }
//     )
//         .toArray()
//     // console.log(two)
    
// }