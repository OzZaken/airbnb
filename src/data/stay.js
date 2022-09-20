const db = {
  "stay": [

    {
      "_id": "stay1",
      "name": "Entire rental unit hosted by Untitled",
      "type": "apartment",
      "imgUrls": [
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258208/airbnb/50083db4-635e-443c-b15f-58e034b0f260_bgrrzt.webp?aki_policy=large",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258208/airbnb/5af61229-8336-4183-a17a-fdd7fe0d16f4_ozhrbv.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258208/airbnb/711c7946-dd4f-4ae8-961a-60be67a709dd_ta5anh.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258209/airbnb/e28fcd30-2c00-46e2-bc41-3850f99567f6_ralmtd.jpg",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258211/airbnb/8d479530-8361-4df2-ad1f-bcb9431f2094_bxhgxl.webp"
      ],
      "price": 80.00,
      "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
      "capacity": 3,
      "stayMap": {
        "bedroom": 1,
        "bath": 2,
        "bed": 1,
      },
      "amenities": [
        "Hair dryer",
        "Essentials",
        "Air conditioning",
        "Heating",
        "Hangers",
        "Wifi",
        "Smoking allowed",
        "Pets allowed",
        "TV",
        "Long term stays allowed"
      ],
      "achievements": [ 'fastWifi', 'superHost','selfCheckIn'],
      "host": {
        "_id": "u101",
        "fullname": "Davit Pok",
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YtOC-DWcKhaIbwJDRuAlgKJKugPwp5dfhKKgOJf_UDtKQdOeZq9CQEetxDF1jmntumU&usqp=CAU?aki_policy=profile_small",
      },
      "loc": {
        "country": "New York",
        "countryCode": "NY",
        "city": "New York",
        "address": "17 Kombo st",
        "lat": -8.61308,
        "lng": 41.1413
      },
      "reviews": [
        {
          "id": "madeId",
          "txt": "Very helpful hosts. Cooked traditional...",
          "rate": 4,
          "by": {
            "_id": "u102",
            "fullname": "user2",
            "imgUrl": "/img/img2.jpg"
          }
        }
      ],
      "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    },
  
    {
      "_id": "stay2",
      "name": "Central Park Nest, High Above The Trees!",
      "type": "apartment",
      "imgUrls": [
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258827/airbnb/5af61229-8336-4183-a17a-fdd7fe0d16f4_nfwlpc.webp?aki_policy=large",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258827/airbnb/315de1cb-a407-4349-864a-01106dfd0a05_ju0crv.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258826/airbnb/75bcc86a-14d3-42ca-baae-76aec611f7d7_vknjpx.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258826/airbnb/baa0cebe-8a2e-4f89-a7db-a751b8cd25e0_kkyl21.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663258826/airbnb/79424152-7fcd-46d6-b91c-e73fa3df7549_nq9yky.webp"
      ],
      "price": 120.00,
      "summary": "Stunning views of Central Park, Upper West Side, and mid-town! Cozy studio apartment with full kitchen and bath. 1 block from the 2 & 3 Subway line, and 3 blocks from the 6 Subway line. CitiBike stand is half a block away, as well as several bus lines, like Museum Mile. Please don't hesitate to ask any questions . Note: Pricing includes NY city & state occupancy taxes. Thanks for understanding!",
      "capacity": 6,
      "stayMap": {
        "bedroom": 1,
        "bath": 2,
        "bed": 1,
      },
      "amenities": [
        "Kitchen",
        "Wifi",
        "Free street parking",
        "Elevator",
        "Air conditioning",
        "Hot water",
        "iron",
      ],
      "achievements": [ 'fastWifi', 'superHost','selfCheckIn'],
      "host": {
        "_id": "u101",
        "fullname": "Davit Pok",
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YtOC-DWcKhaIbwJDRuAlgKJKugPwp5dfhKKgOJf_UDtKQdOeZq9CQEetxDF1jmntumU&usqp=CAU?aki_policy=profile_small",
      },
      "loc": {
        "country": "New York",
        "countryCode": "NY",
        "city": "New York",
        "address": "17 Kombo st",
        "lat": -8.61308,
        "lng": 41.1413
      },
      "reviews": [
        {
          "id": "madeId",
          "txt": "Very helpful hosts. Cooked traditional...",
          "rate": 4,
          "by": {
            "_id": "u102",
            "fullname": "user2",
            "imgUrl": "/img/img2.jpg"
          }
        }
      ],
      "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    },
  
    {
      "_id": "stay3",
      "name": "Spacious Studio Apartment in the Heart of Midtown",
      "type": "apartment",
      "imgUrls": [
        "https://res.cloudinary.com/pukicloud/image/upload/v1663259859/airbnb/d1feee3b-36bf-4697-8876-2c48c6a2a1d5_rjsxol.webp?aki_policy=large",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663259858/airbnb/a5a91fed-bdd1-4595-b939-6298c343adb4_jnkxhw.jpg",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663259859/airbnb/6cc642f4-640e-4285-b4f9-c1ebfebcd9bc_nu2xlj.jpg",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663259859/airbnb/ac14c76e-f147-4931-be5e-945002046dfb_ajhrml.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663259860/airbnb/1b47f87a-0ab3-45cf-9b31-80eb3edb9059_r8nffv.webp"
      ],
      "price": 110.00,
      "summary": "Located in Herald Square with immediate access to BDFM, NQRW, & Path trains downstairs and walking distance to NY Penn Station, 123, & ACE trains. One block away from Koreatown and adjacent to the Empire State Building with plentiful access to restaurants and shops!",
      "capacity": 8,
      "stayMap": {
        "bedroom": 1,
        "bath": 2,
        "bed": 1,
      },
      "amenities": [
        "Kitchen",
        "Wifi",
        "Free street parking",
        "Elevator",
        "Air conditioning",
        "Hot water",
        "iron",
      ],
      "achievements": [ 'fastWifi', 'superHost','selfCheckIn'],
      "host": {
        "_id": "u101",
        "fullname": "Davit Pok",
        "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
      },
      "loc": {
        "country": "New York",
        "countryCode": "NY",
        "city": "New York",
        "address": "17 Kombo st",
        "lat": -8.61308,
        "lng": 41.1413
      },
      "reviews": [
        {
          "id": "madeId",
          "txt": "Very helpful hosts. Cooked traditional...",
          "rate": 4,
          "by": {
            "_id": "u102",
            "fullname": "user2",
            "imgUrl": "/img/img2.jpg"
          }
        }
      ],
      "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    },
  
    {
      "_id": "stay4",
      "name": "Sunny Apartment in the Heart of Downtown NYC",
      "type": "apartment",
      "imgUrls": [
        "https://res.cloudinary.com/pukicloud/image/upload/v1663260160/airbnb/1b47f87a-0ab3-45cf-9b31-80eb3edb9059_ham793.webp?aki_policy=large",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663260160/airbnb/49e6ee8d-108f-40ad-9968-7bd94410c14d_aqxio3.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663260159/airbnb/88a59149-3028-4fc1-ac73-4425de6c01ab_xxphh4.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663260159/airbnb/a6952ac9-3dd6-40d5-bbd0-bf93304a85bb_siy1fi.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663260159/airbnb/5d739344-a022-4c72-9013-e440333db39e_ufukis.webp"
      ],
      "price": 110.00,
      "summary": "Located right in the middle of Soho, Little Italy, Nolita, Lower East Side, and Chinatown, as well as minutes away from 3 main subway lines that will take you all around, this is the perfect place to experience all of NYC. Ask any local and they'd tell you the same! Amazing noteworthy restaurants, shopping, nightlife, and art galleries within minutes of walking distance.",
      "capacity": 8,
      "stayMap": {
        "bedroom": 1,
        "bath": 2,
        "bed": 1,
      },
      "amenities": [
        "Bathtub",
        "Cleaning products",
        "Shampoo",
        "Conditioner",
        "Body soap",
        "Hot water",
        "Shower gel",
        "Free washer In unit",
        "Essentials",
        "Hangers",
        "Bed linens",
        "Extra pillows and blankets",
        "Clothing storage: dresser",
        "TV",
        "Exercise equipment: free weights, yoga mat",
        "Books and reading material",
        "Babysitter recommendations",
        "Window AC unit",
        "Portable fans",
        "Radiant heating",
        "Smoke alarm",
        "Carbon monoxide alarm",
        "Fast wifi",
        "Kitchen",
        "Refrigerator",
        "Cooking basics",
        "Dishes and silverware",
        "Freezer",
        "Gas stove",
        "Stainless steel oven",
        "Hot water kettle",
        "Wine glasses",
        "Baking sheet",
        "Blender",
        "Rice maker",
        "Dining table",
        "Laundromat nearby",
        "Paid parking off premises",
        "Luggage dropoff allowed",
        "Long term stays allowed",
        "Self check-in",
        "Cleaning before checkout",
        "Lockbox",
  
      ],
      "achievements": [ 'fastWifi', 'superHost','selfCheckIn'],
      "host": {
        "_id": "u101",
        "fullname": "Davit Pok",
        "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
      },
      "loc": {
        "country": "New York",
        "countryCode": "NY",
        "city": "New York",
        "address": "17 Kombo st",
        "lat": -8.61308,
        "lng": 41.1413
      },
      "reviews": [
        {
          "id": "madeId",
          "txt": "Very helpful hosts. Cooked traditional...",
          "rate": 4,
          "by": {
            "_id": "u102",
            "fullname": "user2",
            "imgUrl": "/img/img2.jpg"
          }
        }
      ],
      "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    },
  
    {
      "_id": "stay5",
      "name": "Brooklyn Loft with great train views",
      "type": "apartment",
      "imgUrls": [
        "https://res.cloudinary.com/pukicloud/image/upload/v1663261005/airbnb/06d00506-2fb7-4930-ac17-d42c59445442_gdttgv.webp?aki_policy=large",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663261005/airbnb/06c87ebe-d3d9-41fe-8c38-9278e1be02a7_em04wb.webp",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663261005/airbnb/393e2f06-27f8-4ada-9416-f3dcb957bce3_edjw92.jpg",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663261006/airbnb/c21757ae-9be1-4e8c-a0f7-7c6f1eec9534_q8vcx2.jpg",
        "https://res.cloudinary.com/pukicloud/image/upload/v1663261006/airbnb/2f45d286-d277-4378-9503-c86e391e872a_xd7zlt.jpg"
      ],
      "price": 120.00,
      "summary": "Loft style studio with high ceilings in South Williamsburg. Nice overhead views of the J/M/Z train on the Williamsburg Bridge. Close to great bars and restaurants, 5 min walk to Domino Park/Water and less than 10 min to either the JMZ or L subway. Would suit young couple.",
      "capacity": 8,
      "stayMap": {
        "bedroom": 1,
        "bath": 2,
        "bed": 1,
      },
      "amenities": [
        "Hair dryer",
        "Cleaning products",
        "Cleaning products",
        "Shampoo",
        "Hot water",
        "Shower gel",
        "Washer",
        "Dryer",
        "Essentials",
        "Hangers",
        "Iron",
        "Air conditioning",
        "Heating",
        "Smoke alarm",
        "Wifi",
        "Kitchen",
        "Refrigerator",
        "Microwave",
        "Cooking basics",
        "Dishes and silverware",
        "Freezer",
        "Dishwasher",
        "Stove",
        "Coffee maker",
        "Wine glasses",
        "Toaster",
        "Elevator",
        "Long term stays allowed",
      ],
      "achievements": [ 'fastWifi', 'superHost','selfCheckIn'],
      "host": {
        "_id": "u101",
        "fullname": "Davit Pok",
        "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
      },
      "loc": {
        "country": "New York",
        "countryCode": "NY",
        "city": "New York",
        "address": "17 Kombo st",
        "lat": -8.61308,
        "lng": 41.1413
      },
      "reviews": [
        {
          "id": "madeId",
          "txt": "Very helpful hosts. Cooked traditional...",
          "rate": 4,
          "by": {
            "_id": "u102",
            "fullname": "user2",
            "imgUrl": "/img/img2.jpg"
          }
        }
      ],
      "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    },
  ],
  "order": [
    {
      "_id": "o1225",
      "hostId": "u102",
      "createdAt": 9898989,
      "buyer": {
        "_id": "u101",
        "fullname": "User 1"
      },
      "totalPrice": 160,
      "startDate": "2025/10/15",
      "endDate": "2025/10/17",
      "guests": {
        "adults": 2,
        "kids": 1
      },
      "stay": {
        "_id": "h102",
        "name": "House Of Uncle My",
        "price": 80.00
      },
      "status": "pending"
    }
  ],
  "user": [
    {
      "_id": "u101",
      "fullname": "User 1",
      "imgUrl": "/img/img1.jpg",
      "username": "user1",
      "password": "secret",
    },
    {
      "_id": "u102",
      "fullname": "User 2",
      "imgUrl": "/img/img2.jpg",
      "username": "user2",
      "password": "secret"
    }
  ]
}

// Homepage: TOP categories: Best Rate / Houses / Kitchen
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})

const stays = [{}, {}]
// HomePage
//  list of stays with link to stay-details
//  CSS Infra, Master CSS
// UserDetails
//  basic info
//  visitedStays => orderService.query({userId: 'u101'})
//  myStayOrders => orderService.query({hostId: 'u101'})
//  ownedStays => stayService.query({hostId: 'u103'})
// StayEdit - make it super easy to add Stay for development
// StayList, StayPreview
// Order, confirm Order
// Lastly: StayExplore, Filtering