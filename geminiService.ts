
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const productSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique identifier for the product, like a UUID." },
        name: { type: Type.STRING, description: "The full name of the product." },
        description: { type: Type.STRING, description: "A compelling, short description of the product (2-3 sentences)." },
        price: { type: Type.NUMBER, description: "The price of the product in USD, without the dollar sign." },
        category: { type: Type.STRING, description: "The category of the product (e.g., 'Electronics', 'Smart Home', 'Audio')." },
        imageUrl: { type: Type.STRING, description: "A placeholder image URL from `https://picsum.photos/seed/{name-of-product}/600/600`" },
    },
    required: ["id", "name", "description", "price", "category", "imageUrl"],
};

export const generateProducts = async (): Promise<Product[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a list of 12 modern and popular electronic gadgets for a premium e-commerce store. Include a mix of items like high-end headphones, smartwatches, drones, and smart home devices. Ensure each product has a unique ID.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: productSchema,
                },
            },
        });

        const jsonString = response.text.trim();
        const products = JSON.parse(jsonString) as Product[];

        // Sanitize image URLs - sometimes the model adds markdown or extra text
        return products.map(p => ({
            ...p,
            imageUrl: p.imageUrl.replace(/`/g, '').trim()
        }));

    } catch (error) {
        console.error("Error generating products with Gemini API:", error);
        // Fallback to static data in case of API error
        return getFallbackProducts();
    }
};

const getFallbackProducts = (): Product[] => {
    return [
        { id: '1', name: 'Aura Wireless Headphones', description: 'Experience immersive sound with noise-cancelling technology.', price: 349.99, category: 'Audio', imageUrl: 'https://picsum.photos/seed/Aura-Headphones/600/600' },
        { id: '2', name: 'Chrono Smartwatch Series 5', description: 'Stay connected and track your fitness with our latest smartwatch.', price: 429.00, category: 'Wearables', imageUrl: 'https://picsum.photos/seed/Chrono-Smartwatch/600/600' },
        { id: '3', name: 'Sky-Rider Pro Drone', description: 'Capture stunning 4K aerial footage with ease and precision.', price: 799.50, category: 'Drones', imageUrl: 'https://picsum.photos/seed/Sky-Rider-Drone/600/600' },
        { id: '4', name: 'Nova Smart Speaker', description: 'Your voice-controlled assistant for music, smart home, and more.', price: 129.00, category: 'Smart Home', imageUrl: 'https://picsum.photos/seed/Nova-Speaker/600/600' },
        { id: '5', name: 'Stream-Deck Pro', description: 'Unleash your creative genius with customizable LCD keys.', price: 149.99, category: 'Gaming', imageUrl: 'https://picsum.photos/seed/Stream-Deck/600/600' },
        { id: '6', name: 'Galaxy Projector 2.0', description: 'Transform any room into a breathtaking galaxy.', price: 89.99, category: 'Home', imageUrl: 'https://picsum.photos/seed/Galaxy-Projector/600/600' },
        { id: '7', name: 'Portable Power Bank 20000mAh', description: 'Charge your devices on the go with this high-capacity power bank.', price: 59.95, category: 'Accessories', imageUrl: 'https://picsum.photos/seed/Power-Bank/600/600' },
        { id: '8', name: 'Ergo-Mech Keyboard', description: 'A split mechanical keyboard for ultimate typing comfort.', price: 219.00, category: 'Computer', imageUrl: 'https://picsum.photos/seed/Ergo-Keyboard/600/600' },
    ];
};
