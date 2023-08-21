import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss']
})
export class RestaurantPageComponent implements OnInit {

  restaurantDes={
    city:'SHIMLA',
    image:'../../assets/h1.jpg',
    description:'Shimla is the capital of the northern Indian state of Himachal Pradesh, in the Himalayan foothills. Once the summer capital of British India, it remains the terminus of the narrow-gauge Kalka-Shimla Railway, completed in 1903. It’s also known for the handicraft shops that line The Mall, a pedestrian avenue, as well as the Lakkar Bazaar, a market specializing in wooden toys and crafts.',
    placesToVisit:[
    {place:'Jakhu Temple',des:'After Lakshmana was cured, Hanuman went back to place the mountain in its original site',image:'../../assets/jakhutemple.jpg'},
    {place:'The Mall',des:' Constructed during British colonial rule, the Mall road is located a level below The Ridge.',image:'../../assets/ridge.jfif'},
    {place:'The Ridge',des:' The Ridge is the hub of all cultural activities of Shimla. It is situated along the Mall Road, which is the famous shopping center of Shimla',image:'../../assets/mallroad.jpg'},
    {place:'Viceregal Lodge',des:'The Rashtrapati Niwas, formerly known as Viceregal Lodge, is located on the Observatory Hills of Shimla,',image:'../../assets/victoria.jpeg'},
    ]
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}
