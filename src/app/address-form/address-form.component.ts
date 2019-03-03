import { Component, OnInit } from "@angular/core";
import { AddressService } from "../address.service";
import { Address } from "../address";
import { AlertService } from "../alert.service";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.css"],
  providers: [AlertService]
})
export class AddressFormComponent implements OnInit {
  addresses: Address[];
  existingAddresses: Address[] = [];
  address: Address = { email: "", name: "", status: "" };
  showAlert: boolean = false;
  uploadStatus: string = "";
  uploadError: boolean = false;
  constructor(
    private addressService: AddressService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService
      .getAddresses()
      .subscribe(addresses => (this.addresses = addresses));
  }

  add(name: string, email: string): void {
    console.log("values received: ", name, email);
    name = name.trim();
    email = email.trim();
    if (!name || !email) {
      return;
    }

    this.addressService
      .addAddress({ name: name, email: email } as Address)
      .subscribe(response => {
        console.log("response: ", response);
        if (response && response["status"] === "exists") {
          this.existingAddresses.push(response as Address);
          this.showAlert = true;
        }

        // this.addresses.push(address);
      });
    this.setDelay(1, 5);
    console.log("existingAdd... in add function: ", this.existingAddresses);
    var emails = this.existingAddresses
      .map(item => {
        return item["email"];
      })
      .toString();
    console.log("emails as string: ", emails);
    // if (this.existingAddresses.length > 0) {
    if (true) {
      this.alertService.confirmThis(
        "Email <" + emails + "> already exists. Want to replace name ?",
        () => {
          console.log("Yes.... helloooooooo");
          this.existingAddresses.forEach(item => {
            console.log("updating.... : ", name, email);
            this.update(name, email);
          });
          this.existingAddresses = [];
          // this.update(name, email);
          // this.showAlert = false;
          //ACTION: Do this If user says YES
        },
        function() {
          console.log("No");
          // this.showAlert = false;
          //ACTION: Do this if user says NO
        }
      );
    }
  }

  setDelay(i, max) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
    }
  update(name: string, email: string): void {
    console.log("in update method: ", name, email);

    this.addressService
      .updateAddress({ name: name, email: email } as Address)
      .subscribe(response => {
        console.log("in update response: ", response);
        // this.addresses.push(address);
      });
  }

  changeListener(files: FileList) {
    this.uploadStatus = "";
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        let csv = reader.result;
        let result = this.csvJSON(csv);
        try {
          var record = result[0];
          var columns = Object.keys(record);
          console.log("Object.keys( record ).columns check", columns);
          if (columns.includes("email") || columns.includes("name")) {
            // if (true) {
            this.uploadError = false;
            this.uploadStatus = "";
            // this.processNext(0, result);
            // this.sendAll(result);
            // console.log("responses: ", responses);

            result.forEach(element => {
              if (element["email"] && element["name"]) {
                this.add(element["name"], element["email"]);
              } else if (!element["email"] && !element["name"]) {
                // ignore row and continue
              } else {
                this.uploadError = true;
                this.uploadStatus =
                  "Required information missing for row: " +
                  (result.indexOf(element) + 1) +
                  " row: " +
                  element.email +
                  " " +
                  element.name;
              }
            });
            this.uploadStatus = "Success";
          } else {
            console.log("record: ", record);
            this.uploadError = true;
            this.uploadStatus = "CSV is not in valid format";
          }
        } catch (e) {
          this.uploadError = true;
          this.uploadStatus = e;
          console.log(e);
        }

        console.log("result: ", result);
      };
    }
  }

  // processNext(currentIndex, result) {
  //   if (currentIndex >= result.length) {
  //     return;
  //   }

  //   var next = result[currentIndex++];
  //   this.addressService
  //     .addAddress({
  //       name: next["name"],
  //       email: next["email"]
  //     } as Address)
  //     .then(response => {
  //       if (response && response["status"] === "exists") {
  //         this.showAlert = true;
  //       }
  //       this.alertService.confirmThis(
  //         "Email <" +
  //           response["email"] +
  //           "> already exists. Want to replace name ?",
  //         () => {
  //           console.log("Yes");
  //           this.update(response["name"], response["email"]);
  //           // this.showAlert = false;
  //           //ACTION: Do this If user says YES
  //         },
  //         function() {
  //           console.log("No");
  //           // this.showAlert = false;
  //           //ACTION: Do this if user says NO
  //         }
  //       );
  //       // this.alertService.showAsComponent("hello");
  //       this.processNext(currentIndex, result);
  //     });
  // }

  async sendAll(results) {
    let responses = [];
    for (let i = 0; i < results.length; i++) {
      responses[i] = await this.addressService.addAddress({
        name: results[i]["name"],
        email: results[i]["email"]
      } as Address);
    }
    responses.forEach(response => {
      console.log("calling for a response: ", response);
      if (response && response["status"] === "exists") {
        this.showAlert = true;
      }
      this.alertService.confirmThis(
        "Email <" +
          response["email"] +
          "> already exists. Want to replace name ?",
        () => {
          console.log("Yes");
          this.update(response["name"], response["email"]);
          this.showAlert = false;
          //ACTION: Do this If user says YES
        },
        function() {
          console.log("No");
          this.showAlert = false;
          //ACTION: Do this if user says NO
        }
      );
    });
    // return responses;
    // Got all the results!
  }

  csvJSON(csv) {
    let lines = csv.split("\n").filter(function(row) {
      return row;
    });
    console.log("lines: ", lines);
    let result = [];
    let headers = lines[0].split(",");
    console.log(
      "headers: ",
      headers.toString(),
      headers.includes("email"),
      headers.includes("name")
    );
    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  }
}
