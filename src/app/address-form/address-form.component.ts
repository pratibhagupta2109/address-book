import { Component, OnInit } from "@angular/core";
import { AddressService } from "../address.service";
import { Address } from "../address";
import { AlertService } from "../alert.service";

@Component({
  selector: "address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.css"]
})
export class AddressFormComponent implements OnInit {
  addresses: Address[];
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
        if (response.status === "exists") {
          this.showAlert = true;
        }
        this.alertService.confirmThis(
          "Email <" +
            response["email"] +
            "> already exists. Want to replace name ?",
          () => {
            console.log("Yes");
            this.update(name, email);
            this.showAlert = false;
            //ACTION: Do this If user says YES
          },
          function() {
            console.log("No");
            this.showAlert = false;
            //ACTION: Do this if user says NO
          }
        );

        // this.addresses.push(address);
      });
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
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        let csv = reader.result;
        let result = this.csvJSON(csv);
        try {
          let record = result[0];
          console.log(".......record", record);
          if (record.hasOwnProperty("email") && record.hasOwnProperty("name")) {
            this.uploadError = false;
            this.uploadStatus = "";
            result.forEach(element => {
              if (element["email"] && element["name"]) {
                this.add(element["name"], element["email"]);
              } else {
                this.uploadError = true;
                this.uploadStatus =
                  "Required information missing for row: " +
                  (result.indexOf(element) + 1);
              }
            });
          } else {
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

  csvJSON(csv) {
    let lines = csv.split("\n").filter(function(row) {
      return row;
    });
    let result = [];
    let headers = lines[0].split(",");
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
