
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://tema333345:qwerty123@cluster0.gz8dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


[{
  "text": "Пиздец, я знаю этого чела. Мы с ним бухали однажды, так вот он разбил на бухаловке каждому ебальник, потому что кто-то рассказал ему не смешной анекдот. Моя жена до сих пор в больнице лежит из-за того случая",
  "id": 0,
  "children": [
          {
          "text": "Ебать вы терпилы, он мне тоже насолил, так я ему из-за этого камень в огород кинул",
          "id": 1,  
          "children": [
              {
                  "text": "Иди нахуй, ты не был в нашей ситуации, хули ты тут распизделся",
                  "id": 2,  
                  "children": null
              },
              {
                  "text": "Странно, что ты ещё пизды не получил",
                  "id": 3,  
                  "children": [ {
                      "text": "Уже получил",
                      "id": 4,  
                      "children": null
                  }]
              },
              {
                  "text": "Ну нихуя себе ты выёбистый",
                  "id": 5,  
                  "children": null
              }
          ]
      }
  ]
},
{
  "text": "ЭТА ГНИДА СОЖГЛА МОЙ ДОМ. ПРОСТО ТАК!!! БЕЗ ПРИЧИН!!! МЫ УЖЕ КУДА ТОЛЬКО НЕ ОБРАЩАЛИСЬ, НО НИКТО НИЧЕГО СДЕЛАТЬ НЕ МОЖЕТ",
  "id": 6,
  "children": [{
      "text": "Пизди больше, я в новостях видел, что он твой дом сжог, потому что ты умный дохуя, мразь ты ебаная, книги читать любишь, кучу статей написал по естественным наукам, какие то эксперементы проводил, лекарства всякие придумывал, а впрочем ты ничо такой)))",
      "id": 7,  
      "children": null
  },
  {
      "text": "САМ ТЫ ГНИДА, а Данил прекрасный парень, помню, я до мужиков доебался а то хули они веселые были, а я нет. Так вот он помог мне и наебашил им, но правда я не понял, почему потом он меня отпиздил, но мне понравился этот парень",
      "id": 8,  
      "children": null
  }]
}]