import { type Locator, type Page } from "@playwright/test";

export class BookingPage {
    readonly page: Page;
    readonly bookNowLink: Locator;
    readonly dateInput: Locator;
    readonly timeInput: Locator;
    readonly confirmButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookNowLink = page.getByRole('link', { name: 'Book Now' });  
        this.dateInput = page.getByPlaceholder('Select Date');
        this.timeInput = page.getByPlaceholder('Select Time');
        this.confirmButton = page.getByRole('button', { name: 'Request Booking' });
        this.successMessage = page.getByText('Booking requested for you');
    }

    async navigateToBooking() {
        await this.bookNowLink.click();
    }

    async selectRinkSlot(slotName: string) {
        await this.page.getByRole('button', { name: slotName }).click();
    }

    async selectDate(date: string) {
        await this.dateInput.fill(date);
    }

    async selectTime(time: string) {
        await this.timeInput.fill(time);
    }

    async confirmBooking() {
        await this.confirmButton.click();
    }

    async bookRink(date: string, time: string) {
        await this.selectDate(date);
        await this.selectTime(time);
        await this.confirmBooking();
    }
}

export default BookingPage;
