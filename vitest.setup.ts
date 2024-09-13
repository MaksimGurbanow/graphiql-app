// vitest.setup.ts
import "@testing-library/jest-dom";

// Mocking ResizeObserver to avoid errors during tests
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
