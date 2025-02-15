export interface IEvaluateBookingRequest{
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    bookingId: string;
}