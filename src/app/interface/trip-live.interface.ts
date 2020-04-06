interface Coordinates{
    0: number;
    1: number;
} 

export interface TripLive{
    destinationName: String;
    driverUid: String;
    state: String;
    destinationCoordinates: Coordinates;
    pickupCoordinates: Coordinates;
}

export interface StatusDriver{
    l: Coordinates
    g: String
}