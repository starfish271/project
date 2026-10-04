---
title: 'Week 2 Studio Cycle: Esp32 Dev board'
date: 2025-09-20
summary: Using 2 esp32 development boards with attached LCD display and Claude Code, I prototyped a mini digital typewriter and drawing pad.
cover: /uploads/Screenshot 2026-10-03 at 10.01.50 PM.png
draft: false
status: completed
blocks:
  - type: paragraph
    body: <p>The inspiration behind this project was a project that I did for another ATLAS class last semester. I got these two dev boards over the summer so I could start prototyping version 2 of my pocket notetaker device, but really never got around to it, so I thought this assignment would be a great opportunity to start developing. Claude Code is what I used mainly, and also had another chat running on the side to ask questions. Eventually I was able to make it work exactly as intended. </p>
  - type: heading
    text: The Prompt
  - type: paragraph
    body: <p>I first had an existing claude chat that I used for version 1 to write me a prompt to give to claude code based on the hardware I had and the vision for this project. </p>
  - type: code
    language: python
    filename: blink.ino
    code: |-
      // Blink — turns an LED on for 1 second, then off, repeatedly.
      // This is the standard Arduino "Hello World" sketch.

      void setup() {
        // Initialize digital pin 13 as an output
        pinMode(13, OUTPUT);
      }

      void loop() {
        digitalWrite(13, HIGH);   // Turn the LED on
        delay(1000);              // Wait for 1 second
        digitalWrite(13, LOW);    // Turn the LED off
        delay(1000);              // Wait for 1 second
      }
  - type: heading
    text: Demo
  - type: paragraph
    body: <p>This prototype was an idea I've had for a while and using Claude Code really made the process smooth and fast.</p>
---

This body text is ignored — the blocks in the frontmatter are what render on the page.
