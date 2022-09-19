import React from 'react';
import Carousel from 'react-material-ui-carousel'

function Example(props) {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
   
    )
}

//       <Carousel>
//       {
//           stays.map((stay) => <PrevImg key={stay._id} stay={stay} />)
//           stay.imgUrls.map((imgUrl) => <img key={stay._id} src={imgUrl} alt="image" />) 
//       }
//   </Carousel>