---
title: 'Lab 1: Capacitive Touch'
date: 2025-09-20
summary: Capacitive sensing lab using LEDs, ESP32, passive buzzer, jumper wire, tin foil, tape, cardboard, and lots of coding.
cover: /project/uploads/IMG_2767.jpeg
draft: false
blocks:
  - type: paragraph
    body: |-
      <p>This is a template post showing how each content block looks on the page. It's not a real project — just a reference so you can see the formatting before you start writing your own posts through the <a href="/admin">admin portal</a>.</p>
      <p>The classic "blink an LED" sketch is the hello world of physical computing. You wire an LED to a digital pin, then toggle it on and off with a delay. Let's walk through it.</p>
  - type: photo
    image: /project/uploads/IMG_2768.jpeg
    alt: sensor connected to blue LED
    caption: sensor connected to blue LED
    width: wide
  - type: photo
    image: /project/uploads/IMG_2767.jpeg
    alt: sensor connected to green LED
    caption: sensor connected to green LED
    width: normal
  - type: photo
    image: /project/uploads/IMG_2769.jpeg
    alt: sensor connected to red LED
    caption: sensor connected to red LED
    width: normal
  - type: heading
    text: The Circuit
  - type: paragraph
    body: |-
      <p>The circuit is simple: connect the long leg of an LED (anode) to a <strong>220&Omega; resistor</strong>, then to <strong>pin 13</strong> on the Arduino. Connect the short leg (cathode) to <strong>GND</strong>. The resistor limits current so the LED doesn't burn out.</p>
      <p>You don't strictly need the resistor if you're just testing — pin 13 has a built-in LED on most Arduino boards — but it's good practice to include one.</p>
  - type: code
    language: cpp
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
  - type: youtube
    caption: Replace this placeholder URL with your own demo video.
    url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  - type: paragraph
    body: <p>And that's it — the foundation of every Arduino project. From here you can add buttons, sensors, motors, or displays. The blink sketch is a great way to verify your board is working before you build something more complex.</p>
---

This body text is ignored — the blocks in the frontmatter are what render on the page.
