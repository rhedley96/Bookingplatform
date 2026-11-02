import { type Locator, type Page } from "@playwright/test";

export class HomePage{
    readonly page:Page;
    readonly signInButton: Locator;


    constructor(page: Page){
        this.page = page;
        this.signInButton = page.getByRole('link', { name: "Sign In" });
    }
    async clickSignIn(){
        await this.signInButton.click();
    }

}
export default HomePage;