import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// import { InMemoryDataService } from "./in-memory-data.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { FormsModule } from "@angular/forms";
import { AddressService } from "./address.service";
import { AutoGrowDirective } from "./auto-grow.directive";
import { AddressFormComponent } from "./address-form/address-form.component";
import { AddressListComponent } from "./address-list/address-list.component";
import { AlertComponent } from "./alert/alert.component";
import { AlertService } from "./alert.service";
// import { MessagesComponent } from "./messages/messages.component";

@NgModule({
  declarations: [
    AppComponent,
    AddressesComponent,
    AutoGrowDirective,
    AddressFormComponent,
    AddressListComponent,
    AlertComponent
    // MessagesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AddressService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {}
