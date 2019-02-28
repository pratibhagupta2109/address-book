import { Component, Input } from "@angular/core";
import { AlertService } from "../alert.service";
@Component({
  //moduleId: module.id,
  selector: "alert",
  templateUrl: "alert.component.html"
})
export class AlertComponent {
  message: any;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    //this function waits for a message from alert service, it gets
    //triggered when we call this from any other component
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
}

// ?????????
// import { Component, Input } from "@angular/core";
// import { AlertService } from "../alert.service";
// import { EventEmitter, Output } from "@angular/core";
// import {
//   animate,
//   state,
//   style,
//   transition,
//   trigger
// } from "@angular/animations";
// import { Address } from "../address";

// @Component({
//   //moduleId: module.id,
//   selector: "alert",
//   templateUrl: "alert.component.html"
//   // template: `
//   //   <dynamic-form
//   //     [messages]="messages"
//   //     #form="dynamicForm"
//   //     (submit)="submit($event)"
//   //   >
//   //   </dynamic-form>

//   //   <p>Form value:</p>
//   //   <pre>{{ form.value | json }}</pre>

//   //   <p><b>Submitting value</b>(<i>will apprear after submitting</i>):</p>
//   //   <pre>{{ data | json }}</pre>
//   // `
// })
// export class AlertComponent {
//   // message: any;
//   private state: "opened" | "closed" = "closed";

//   @Input()
//   set messages(existingAddresses: Address[]) {
//     console.log(".......................in set messages: ", this._messages);
//     console.log("existingAddresses: ", existingAddresses);
//     this._messages = existingAddresses;
//     this.text_message = existingAddresses
//       .map(item => {
//         return item["email"];
//       })
//       .toString();
//     this.state = "opened";
//   }
//   get messages(): Address[] {
//     console.log("in get messages: ", this._messages);
//     return this._messages;
//   }
//   _messages: Address[];
//   public text_message: string;

//   @Output()
//   closed = new EventEmitter();

//   constructor(private alertService: AlertService) {}

//   ngOnInit() {
//     //this function waits for a message from alert service, it gets
//     //triggered when we call this from any other component
//     this.alertService.getMessage().subscribe(message => {
//       this._messages = message;
//     });
//   }
// }
