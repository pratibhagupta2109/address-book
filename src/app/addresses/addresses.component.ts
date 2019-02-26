import { Component, OnInit } from "@angular/core";

import { Address } from "../address";
import { AddressService } from "../address.service";

@Component({
  selector: "app-addresses",
  templateUrl: "./addresses.component.html",
  styleUrls: ["./addresses.component.css"]
})
export class AddressesComponent implements OnInit {
  addresses: Address[];

  constructor(private addressService: AddressService) {
    // this.addresses = addressService.getAddresses();
  }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService
      .getAddresses()
      .subscribe(addresses => (this.addresses = addresses));
  }

  add(name: string, email: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.addressService.addAddress({ name } as Address).subscribe(address => {
      this.addresses.push(address);
    });
  }

  delete(address: Address): void {
    this.addresses = this.addresses.filter(h => h !== address);
    this.addressService.deleteAddress(address).subscribe();
  }
}
