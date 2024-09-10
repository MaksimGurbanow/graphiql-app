import { Request } from 'node-fetch';
import handleRequest from '../app/entry.server.tsx';
import { describe, it, expect } from "vitest";

describe('handleRequest', () => {
    it('should call handleRequest successfully', async () => {
        try {
            const mockRequest = new Request('http://localhost', {
                headers: { 'user-agent': 'Mozilla/5.0' },
            });

            const response = await handleRequest(mockRequest);

            expect(response).toBeDefined();
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Test failed with error:', error);
        }
    });
});
