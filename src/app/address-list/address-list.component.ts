import { Component, OnInit } from "@angular/core";
import { Address } from "../address";
import { AddressService } from "../address.service";

@Component({
  selector: "address-list",
  templateUrl: "./address-list.component.html",
  styleUrls: ["./address-list.component.css"]
})
export class AddressListComponent implements OnInit {
  addresses: Address[];
  // addresses: object[];
  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.getAddresses();
    // console.log("in address-list", this.addresses);
  }

  getAddresses(): void {
    this.addressService
      .getAddresses()
      .subscribe(addresses => (this.addresses = addresses));
  }
}
