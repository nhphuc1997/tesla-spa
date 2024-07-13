curl -X 'POST' \
  'http://13.213.88.50/backend/technical/bulk' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "bulk": [
    
  {
    "name": "Mercedes-Benz",
    "acceleration": "7.2 Seconds",
    "topSpeech": "120 mph",
    "maxOutput": "325 kW, 306 PS (210 kW, 326 PS with launch control)",
    "transmission": "Automatic",
    "categoryId": 1,
    "unladenWeight": "2,375 Kg",
    "grossWeight": "2,815 Kg",
    "roofLoad": "75 Kg/ 100 Kg",
    "unbraked": "760 Kg",
    "at12Gradient": "2,020 Kg",
    "at8Gradient": "2,100 Kg",
    "luggageCompartment": "526 (rear seats up)/ 1529 (rear seats down) / 64 (frunk) Litres"
  },
  {
    "name": "lexus",
    "acceleration": "4.2 Seconds",
    "topSpeech": "120 mph",
    "maxOutput": "325 kW, 306 PS (210 kW, 326 PS with launch control)",
    "transmission": "Automatic",
    "categoryId": 2,
    "unladenWeight": "2,895 Kg",
    "grossWeight": "2,915 Kg",
    "roofLoad": "105 Kg/ 100 Kg",
    "unbraked": "720 Kg",
    "at12Gradient": "2,320 Kg",
    "at8Gradient": "2,120 Kg",
    "luggageCompartment": "516 (rear seats up)/ 1529 (rear seats down) / 69 (frunk) Litres"
  },
  {
    "name": "Audi",
    "acceleration": "6.7 Seconds",
    "topSpeech": "130 mph",
    "maxOutput": "225 kW, 306 PS (240 kW, 326 PS with launch control)",
    "transmission": "Automatic",
    "categoryId": 3,
    "unladenWeight": "2,275 Kg",
    "grossWeight": "2,815 Kg",
    "roofLoad": "75 Kg/ 100 Kg",
    "unbraked": "750 Kg",
    "at12Gradient": "2,000 Kg",
    "at8Gradient": "2,000 Kg",
    "luggageCompartment": "526 (rear seats up)/ 1529 (rear seats down) / 64 (frunk) Litres"
  },
  {
    "name": "Bentley",
    "acceleration": "4.2 Seconds",
    "topSpeech": "120 mph",
    "maxOutput": "325 kW, 306 PS (210 kW, 326 PS with launch control)",
    "transmission": "Automatic",
    "categoryId": 4,
    "unladenWeight": "2,895 Kg",
    "grossWeight": "2,915 Kg",
    "roofLoad": "105 Kg/ 100 Kg",
    "unbraked": "720 Kg",
    "at12Gradient": "2,320 Kg",
    "at8Gradient": "2,120 Kg",
    "luggageCompartment": "516 (rear seats up)/ 1529 (rear seats down) / 69 (frunk) Litres"
  },
  {
    "name": "BMW",
    "acceleration": "6.2 Seconds",
    "topSpeech": "112 mph",
    "maxOutput": "335 kW, 316 PS (210 kW, 336 PS with launch control)",
    "transmission": "Automatic",
    "categoryId": 5,
    "unladenWeight": "2,895 Kg",
    "grossWeight": "2,815 Kg",
    "roofLoad": "82 Kg/ 100 Kg",
    "unbraked": "721 Kg",
    "at12Gradient": "2,320 Kg",
    "at8Gradient": "2,120 Kg",
    "luggageCompartment": "516 (rear seats up)/ 1529 (rear seats down) / 69 (frunk) Litres"
  }
  ]
}'


