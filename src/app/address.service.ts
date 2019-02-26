import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Address } from "./address";
import { MessageService } from "./message.service";
import { ADDRESSES } from "./addresses-mock";
import { switchMap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class AddressService {
  private addressesUrl = "https://address-book-pratibha.appspot.com/server"; // URL to web api
  private newAddress: any;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // /** GET addresses from the server */
  // getAddresses(): Observable<Address[]> {
  //   return this.http.get<Address[]>(this.addressesUrl + "/query").pipe(
  //     tap(_ => this.log("fetched addresses")),
  //     catchError(this.handleError("getAddresses", []))
  //   );
  // }

  /** GET addresses from the server */
  getAddresses() {
    // return [
    //   { email: "user1@example.com", name: "user1" },
    //   { email: "user2@example.com", name: "user2" }
    // ];
    return this.http.get<Address[]>(this.addressesUrl + "/query");
  }

  // getAddresses() {
  //   return this.http.get(this.addressesUrl + "/query").subscribe(data => {
  //     console.log("We got: ", data);
  //   });
  // }

  /** GET address by id. Return `undefined` when id not found */
  getAddressNo404<Data>(id: number): Observable<Address> {
    const url = `${this.addressesUrl}/?id=${id}`;
    return this.http.get<Address[]>(url).pipe(
      map(addresses => addresses[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} address id=${id}`);
      }),
      catchError(this.handleError<Address>(`getAddress id=${id}`))
    );
  }

  /** GET address by id. Will 404 if id not found */
  getAddress(id: number): Observable<Address> {
    const url = `${this.addressesUrl}/${id}`;
    return this.http.get<Address>(url).pipe(
      tap(_ => this.log(`fetched address id=${id}`)),
      catchError(this.handleError<Address>(`getAddress id=${id}`))
    );
  }

  /* GET addresses whose name contains search term */
  searchAddresses(term: string): Observable<Address[]> {
    if (!term.trim()) {
      // if not search term, return empty address array.
      return of([]);
    }
    return this.http.get<Address[]>(`${this.addressesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found addresses matching "${term}"`)),
      catchError(this.handleError<Address[]>("searchAddresses", []))
    );
  }

  // /** POST: add a new address to the server */
  // addAddress(address: Address): Observable<Address> {
  //   return this.http
  //     .post<Address>(this.addressesUrl + "/insert", address, httpOptions)
  //     .pipe(
  //       tap((newAddress: Address) =>
  //         // console.log('in addAddresService' + newAddress);
  //         this.log(`added address w/ id=${newAddress.email}`)
  //       ),
  //       catchError(this.handleError<Address>("addAddress"))
  //     );
  // }

  addAddress(address: Address) {
    return this.http
      .post(this.addressesUrl + "/insert", address, httpOptions)
      .toPromise();
  }

  // /** POST: add a new address to the server */
  // addAddress(address: Address): Observable<Address> {
  //   return this.http
  //     .post<Address>(this.addressesUrl + "/insert", address, httpOptions)
  //     .pipe(
  //       tap((newAddress: Address) =>
  //         // console.log('in addAddresService' + newAddress);
  //         this.log(`added address w/ id=${newAddress.email}`)
  //       ),
  //       catchError(this.handleError<Address>("addAddress"))
  //     );
  // }

  updateAddress(address: Address): Observable<Address> {
    return this.http
      .post<Address>(this.addressesUrl + "/update", address, httpOptions)
      .pipe(
        tap(_ => this.log(`updated address id=${address.email}`)),
        catchError(this.handleError<any>("updateAddress"))
      );
  }
  /** DELETE: delete the address from the server */
  deleteAddress(address: Address | number): Observable<Address> {
    const id = typeof address === "number" ? address : address.email;
    const url = `${this.addressesUrl}/${id}`;

    return this.http.delete<Address>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted address id=${id}`)),
      catchError(this.handleError<Address>("deleteAddress"))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AddressService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AddressService: ${message}`);
  }
}
