# Fourier Audio Lab + AI

Build sounds from sine waves, visualize the Fourier transform, and train a neural network to classify them in real-time.

**Live Demo**: [https://vinovator.github.io/my-ai-tools/fourier-lab/index.html](https://vinovator.github.io/my-ai-tools/fourier-lab/index.html)

## Features

- **Waveform Synthesis**: Construct complex sounds by adjusting the amplitude of individual sine wave harmonics.
- **Real-time FFT**: Visualizes the frequency spectrum (Fourier Transform) of the sound you create.
- **Neural Network Classifier**:
    - **Train**: One-click training of a neural network in the browser.
    - **Predict**: Real-time classification of your sound into instrument presets (Clarinet, Organ, Bell, etc.).
- **Interactive Visualization**: See the neural network's confidence bars and predictions live.

## How it Works

1.  **Harmonics**: You control the "recipe" of the sound using sliders. Each slider adds a sine wave at a multiple of the base frequency.
2.  **Fourier Transform**: The app decomposes the sound back into its frequencies, shown in the spectrum view.
3.  **AI**: The neural net takes the 8 harmonic values as input and learns to map patterns to instrument names. It's a simple multi-layer perceptron running entirely in your browser!
