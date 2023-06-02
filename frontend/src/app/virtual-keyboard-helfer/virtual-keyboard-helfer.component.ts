import { Component, OnInit, Renderer2, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-virtual-keyboard-helfer',
  templateUrl: './virtual-keyboard-helfer.component.html',
  styleUrls: ['./virtual-keyboard-helfer.component.css']
})
export class VirtualKeyboardHelferComponent implements OnInit {

  constructor(private renderer: Renderer2, private applicationRef: ApplicationRef) { }

  ngOnInit() {
    let global = this.renderer.listen('document', 'keypress', (evt) => {

      let event2 = new Event('input');
      document.activeElement.dispatchEvent(event2);
      console.log("dispatched");
    })

  }

}
