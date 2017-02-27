/**
 * Importing core components
 */
import { Component, OnInit, Input, ElementRef } from "@angular/core";


/**
 * Component decorator
 */
@Component({
  selector: "image-zoom",
  templateUrl: "image-zoom-component.html",
  styleUrls: ["image-zoom-component.scss"]
})

/**
 * Exporting ImageZoomComponent
 */
export class ImageZoomComponent implements OnInit {
  @Input() imageSource: any;
  @Input() altText: any;

  naviteElement: any = null;
  zoomElement: any = null;
  largeElement: any = null;
  smallElement: any = null;
  imageElement: any = null;
  imageWidth: number = 0;
  imageHeight: number = 0;


  constructor(private selector: ElementRef) {

  }

  ngOnInit() {

  }




  zoomIn(event) {

    console.log("hover...");

    this.naviteElement = this.selector.nativeElement;
    this.zoomElement = this.naviteElement.getElementsByClassName("zoom")[0];
    this.largeElement = this.naviteElement.getElementsByClassName("large")[0];
    this.smallElement = this.naviteElement.getElementsByClassName("small")[0];
    this.imageElement = this.naviteElement.getElementsByTagName("img")[0];

    if (!this.imageWidth && !this.imageHeight) {

      var imageSource = this.imageElement.getAttribute("src");
      var imageObject = new Image();
      imageObject.setAttribute("src", imageSource);

      //Get the image width
      this.imageWidth = imageObject.width;
      this.imageHeight = imageObject.height;



    } else {

      //set Large UI
      var imageSource = this.imageElement.getAttribute("src");
      this.largeElement.style.backgroundImage = "url(" + imageSource + ")";

      //Offset top
      var bodyRect = document.body.getBoundingClientRect(),
        elemRect = this.zoomElement.getBoundingClientRect(),
        offsetTop = elemRect.top - bodyRect.top,
        offsetLeft = elemRect.left - bodyRect.left;

      //Get mouse pozitions
      var moveX = event.pageX - offsetLeft;
      var moveY = event.pageY - offsetTop;



      if (moveX < this.zoomElement.clientWidth && moveY < this.zoomElement.clientHeight && moveX > 0 && moveY > 0) {
        this.largeElement.style.display = "block";

        var positionX = Math.round(moveX / this.smallElement.clientWidth * this.imageWidth - this.largeElement.clientWidth / 2) * -1;
        var positionY = Math.round(moveY / this.smallElement.clientHeight * this.imageHeight - this.largeElement.clientHeight / 2) * -1;
        var bgp = positionX + "px " + positionY + "px";

        var left = Math.ceil(moveX - this.largeElement.clientWidth / 2);
        var top = Math.ceil(moveY - this.largeElement.clientHeight / 2);

        this.largeElement.style.left = left + "px";
        this.largeElement.style.top = top + "px";
        this.largeElement.style.backgroundPosition = bgp;


      } else {
        this.largeElement.style.display = "none";
      }
    }




  }

  exitZoom() {
    this.largeElement.style.display = "none";
  }



}
