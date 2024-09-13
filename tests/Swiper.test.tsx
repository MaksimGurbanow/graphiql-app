import { render, screen, fireEvent } from "@testing-library/react";
import Swiper from "../app/components/swiper/Swiper";
import { describe, it, expect } from "vitest";

describe("Swiper Component", () => {
  const slides = [
    <div key="slide1">Slide 1</div>,
    <div key="slide2">Slide 2</div>,
    <div key="slide3">Slide 3</div>,
  ];

  it("renders all slides correctly", () => {
    render(<Swiper>{slides}</Swiper>);

    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("moves to the next slide on next button click", () => {
    render(<Swiper>{slides}</Swiper>);

    const nextButton = screen.getByRole("button", { name: "❯" });
    fireEvent.click(nextButton);

    expect(screen.getByText("Slide 2")).toBeVisible();
  });

  it("moves to the previous slide on prev button click", () => {
    render(<Swiper>{slides}</Swiper>);

    const prevButton = screen.getByRole("button", { name: "❮" });
    fireEvent.click(prevButton);

    expect(screen.getByText("Slide 3")).toBeVisible();
  });

  it("moves to specific slide on pagination dot click", () => {
    render(<Swiper>{slides}</Swiper>);

    const paginationDots = screen.getAllByRole("button");

    fireEvent.click(paginationDots[1]);

    // Проверяем, что второй слайд активен
    expect(screen.getByText("Slide 2")).toBeVisible();
  });

  it("cycles back to first slide after last slide on next button click", () => {
    render(<Swiper>{slides}</Swiper>);

    const nextButton = screen.getByRole("button", { name: "❯" });

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(screen.getByText("Slide 1")).toBeVisible();
  });

  it("cycles to last slide from first slide on prev button click", () => {
    render(<Swiper>{slides}</Swiper>);

    const prevButton = screen.getByRole("button", { name: "❮" });
    fireEvent.click(prevButton);

    expect(screen.getByText("Slide 3")).toBeVisible();
  });
});
