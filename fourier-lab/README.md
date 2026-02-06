# Fourier Audio Lab + AI

A comprehensive interactive experience connecting trigonometry, signal processing, and artificial intelligence. Compose sounds from raw sine waves, visualize their Fourier decomposition in real-time, and train a neural network in the browser to recognize "instruments" based on their harmonic fingerprints.

**Live Demo**: [https://vinovator.github.io/my-ai-tools/fourier-lab/index.html](https://vinovator.github.io/my-ai-tools/fourier-lab/index.html)

## Overview

This lab demonstrates the fundamental pipeline of audio AI:
1.  **Trigonometry**: Provides the building blocks (sine waves).
2.  **Fourier Analysis**: Decomposes complex signals into those building blocks.
3.  **Neural Networks**: Learn to recognize patterns in the decomposition.

## Interactive Features

### 🎛️ Additive Synthesis
Build sounds from scratch using sine waves. Each "harmonic" slider controls the amplitude of a sine wave at a multiple of the base frequency. Drag the sliders to sculpt the timbre and play the result to hear how harmonic content changes the sound character.

### 📊 The Fourier Connection
Visualize the mathematics of sound in real-time:
- **Time Domain (Top)**: The green oscilloscope trace shows the combined waveform shape.
- **Frequency Domain (Bottom)**: The FFT bars show how much energy sits at each harmonic.
This visually demonstrates the Fourier Transform: decomposing a signal into its constituent sine wave ingredients.

### 🎹 Harmonic Presets
Explore the unique harmonic "recipes" of different instruments. Select presets like:
- **Clarinet**: Emphasizes odd harmonics for a hollow, woody sound.
- **Sawtooth**: Contains all harmonics with amplitude decreasing as 1/n, creating a bright, buzzy tone.
- **Bell**: Uses specific harmonic intervals to create inharmonic metallic sounds.

### 🧠 In-Browser AI Training
Train a neural network entirely in your browser using raw JavaScript (no external libraries).
1.  **Train**: The system generates 200 noisy examples of each instrument's profile.
2.  **Classify**: Once trained, the model analyzes your current slider positions in real-time.
3.  **Experiment**: Morph the sliders gradually to see when the AI changes its classification, effectively probing the decision boundaries of the model.

---
*Built with React and raw Canvas API.*
