import { render, screen, fireEvent } from "@testing-library/react";
import AudioPlayer, {
  AudioPlayerProps,
} from "../app/components/audio-player/AudioPlayer";
import { describe, it, expect, vi } from "vitest";

Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  writable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  writable: true,
  value: vi.fn(),
});

vi.mock("react-icons/fa", () => ({
  FaPlay: () => <span>Play Icon</span>,
  FaPause: () => <span>Pause Icon</span>,
  FaVolumeUp: () => <span>Volume Icon</span>,
}));

describe("AudioPlayer Component", () => {
  const defaultProps: AudioPlayerProps = {
    src: "test-audio.mp3",
    onPlay: vi.fn(),
    onPause: vi.fn(),
  };

  it("renders the audio player with play button", () => {
    render(<AudioPlayer {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Play Icon")).toBeInTheDocument();
  });

  it("plays audio when play button is clicked", () => {
    render(<AudioPlayer {...defaultProps} />);
    const playButton = screen.getByRole("button");

    fireEvent.click(playButton);
    expect(defaultProps.onPlay).toHaveBeenCalled();
  });

  it("pauses audio when pause button is clicked", () => {
    render(<AudioPlayer {...defaultProps} />);
    const playButton = screen.getByRole("button");

    fireEvent.click(playButton);
    expect(defaultProps.onPlay).toHaveBeenCalled();

    fireEvent.click(playButton);
    expect(defaultProps.onPause).toHaveBeenCalled();
  });

  it("changes volume when the volume slider is adjusted", () => {
    render(<AudioPlayer {...defaultProps} />);
    const volumeSlider = screen.getByRole("slider");

    fireEvent.change(volumeSlider, { target: { value: 0.5 } });
    expect(volumeSlider).toHaveValue("0.5");
  });

  it("does not play audio if play fails and logs error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const audioPlayMock = vi
      .fn()
      .mockRejectedValue(new Error("Failed to play"));
    HTMLMediaElement.prototype.play = audioPlayMock;

    render(<AudioPlayer {...defaultProps} />);
    const playButton = screen.getByRole("button");

    fireEvent.click(playButton);
    await expect(audioPlayMock).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to play the audio:",
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });
});
