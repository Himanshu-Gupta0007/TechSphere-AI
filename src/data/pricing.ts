import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Starter AI",
        price: 29,
        period: "month",
        features: [
            "JS basics with AI support",
            "AI-powered courses",
            "10 JS practice projects",
            "Community access",
            "Certificate"
        ],
        mostPopular: false
    },
    {
        name: "Pro AI",
        price: 79,
        period: "month",
        features: [
            "Advanced JS + AI",
            "30 real-world projects",
            "AI code review",
            "1-on-1 mentoring",
            "Job assistance"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise AI",
        price: 199,
        period: "month",
        features: [
            "Full JS + AI access",
            "Unlimited projects",
            "Dedicated support",
            "Premium AI reviews",
            "Team learning tools"
        ],
        mostPopular: false
    }
];
