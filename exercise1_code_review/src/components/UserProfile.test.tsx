import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserProfile from "./UserProfile";

// Mock getApiUrl function to return a fixed URL 
jest.mock("../config", () => ({
    getApiUrl: jest.fn(() => "http://mocked-api.test"),
}));

// Mock global fetch API 
global.fetch = jest.fn();

describe("UserProfile API Call", () => {
    beforeEach(() => {
        // Clear previous fetch mocks before each test 
        (fetch as jest.Mock).mockClear();
    });

    it("calls API and displays user data", async () => {
        // Mock API returning a user 
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: "Satyam Kumar", email: "satyam.kumar@example.com" }),
        });

        render(<UserProfile userId={1} />);

        // Ensure fetch is called with the mocked URL
        expect(fetch).toHaveBeenCalledWith(
            "http://mocked-api.test/users/1",
            expect.anything()
        );

        // Wait for UI to update with user data
        await waitFor(() => {
            expect(screen.getByText("Satyam Kumar")).toBeInTheDocument();
            expect(screen.getByText("satyam.kumar@example.com")).toBeInTheDocument();
        });
    });

    it("shows error on failed API call", async () => {
        // Mock API failure 
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        render(<UserProfile userId={1} />);

        // UI should display error message
        await waitFor(() => {
            expect(
                screen.getByText("Error loading user. Please try again later.")
            ).toBeInTheDocument();
        });
    });

    it("handles missing optional fields (no bio)", async () => {
        // Mock API returning user without bio 
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: "Satyam Kumar", email: "satyam.kumar@example.com" }),
        });

        render(<UserProfile userId={2} />);

        // UI should display name and email, but no bio
        await waitFor(() => {
            expect(screen.getByText("Satyam Kumar")).toBeInTheDocument();
            expect(screen.getByText("satyam.kumar@example.com")).toBeInTheDocument();
            expect(screen.queryByText(/bio/i)).not.toBeInTheDocument();
        });
    });

    it("shows loading state before API call resolves", async () => {
        // Make fetch never resolve to simulate loading state 
        (fetch as jest.Mock).mockImplementation(() => new Promise(() => { }));

        render(<UserProfile userId={3} />);

        // UI should immediately show loading indicator
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("retries API call when Retry button is clicked", async () => {
        // First API call fails 
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        render(<UserProfile userId={4} />);

        // Wait for error message
        await waitFor(() => {
            expect(
                screen.getByText("Error loading user. Please try again later.")
            ).toBeInTheDocument();
        });

        // Second API call succeeds after retry
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: "Satyam Kumar", email: "satyam.kumar@example.com" }),
        });

        // Click the retry button
        fireEvent.click(screen.getByRole("button", { name: /retry/i }));

        // UI should now display updated user data
        await waitFor(() => {
            expect(screen.getByText("Satyam Kumar")).toBeInTheDocument();
            expect(screen.getByText("satyam.kumar@example.com")).toBeInTheDocument();
        });

        // Ensure fetch was called twice (initial + retry)
        expect(fetch).toHaveBeenCalledTimes(2);
    });
});