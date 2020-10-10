import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriber-recepit',
  templateUrl: './subscriber-recepit.page.html',
  styleUrls: ['./subscriber-recepit.page.scss'],
})
export class SubscriberRecepitPage implements OnInit {
  
  data=['https://www.lifewire.com/thmb/1na-tdifkQUT1obPOp7r0AwP2Bc=/1373x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ScreenShot2020-04-20at10.06.28AM-69855f4797cb4be4bbed72f51dff1ab5.jpg',
'https://www.lifewire.com/thmb/1na-tdifkQUT1obPOp7r0AwP2Bc=/1373x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ScreenShot2020-04-20at10.06.28AM-69855f4797cb4be4bbed72f51dff1ab5.jpg']
  constructor() { }
 
  ngOnInit() {
    
  }
  share(img){
    console.log(img)
  }

}
