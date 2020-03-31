export interface DestinationCoordinates{
    0: Number;
    1: Number
}
export interface PickupCoordinates{
    0: Number;
    1: Number
}

export interface Trip{
    destinationCoordinates: DestinationCoordinates;
    destinationName: String;
    driverUid: string;
    pickupCoordinates: PickupCoordinates,
    state: Number;
    dateFinished: String;
    dateStart: String
    distanceInMeter: Number
    expectTimeTravel: Number
    priceTrip: Number;
    timeTrip: string;
    passengerUid: String
}

export interface Drivers {
    AccountType : Number;
    BankAccount: String;
    Email: String;
    LastName: String;
    Name: String;
    NameBank: String;
    PhoneNumber: String;
    SSN: String;
    driverLicenseImageUrl: String
    profileImageUrl: String,
    state: Number;
    date?: String;
    key?: String
}

export interface User {
    AccountType: number;
    Email: String;
    LastName: String;
    Name: String;
    PhoneNumber: String;
    profileImageUrl: String;
}