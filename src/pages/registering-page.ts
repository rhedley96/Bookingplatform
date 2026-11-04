import { type Locator, type Page } from "@playwright/test";

export class RegisteringPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly clubSlugInput: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.clubSlugInput = page.getByPlaceholder('Club Slug');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.successMessage = page.getByText('Registration successful!');
    }
    async navigateToRegistering() {
        await this.page.goto('/auth/register');
    }

    async register(name: string, email: string, password: string, clubSlug: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        if (clubSlug) {
            await this.clubSlugInput.fill(clubSlug);
        }
        await this.registerButton.click();
    }
    }

