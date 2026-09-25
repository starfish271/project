---
title: "Blinking an LED with Arduino"
date: 2025-09-20
summary: "A template post demonstrating every block type — the classic Arduino blink sketch with a photo, circuit description, code, and a demo video placeholder."
cover: "https://images.pexels.com/photos/15470542/pexels-photo-15470542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
draft: false
blocks:
  - type: paragraph
    body: |
      <p>This is a template post showing how each content block looks on the page. It's not a real project — just a reference so you can see the formatting before you start writing your own posts through the <a href="/admin">admin portal</a>.</p>
      <p>The classic "blink an LED" sketch is the hello world of physical computing. You wire an LED to a digital pin, then toggle it on and off with a delay. Let's walk through it.</p>

  - type: photo
    image: "https://images.pexels.com/photos/15470542/pexels-photo-15470542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    alt: "Arduino microcontroller connected to a breadboard with a glowing LED"
    caption: "An Arduino Nano on a breadboard with a single LED and resistor."
    width: "wide"

  - type: heading
    text: "The Circuit"

  - type: paragraph
    body: |
      <p>The circuit is simple: connect the long leg of an LED (anode) to a <strong>220&Omega; resistor</strong>, then to <strong>pin 13</strong> on the Arduino. Connect the short leg (cathode) to <strong>GND</strong>. The resistor limits current so the LED doesn't burn out.</p>
      <p>You don't strictly need the resistor if you're just testing — pin 13 has a built-in LED on most Arduino boards — but it's good practice to include one.</p>

  - type: code
    language: "cpp"
    filename: "blink.ino"
    code: |
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
    text: "Demo"

  - type: youtube
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    caption: "Replace this placeholder URL with your own demo video."

  - type: paragraph
    body: |
      <p>And that's it — the foundation of every Arduino project. From here you can add buttons, sensors, motors, or displays. The blink sketch is a great way to verify your board is working before you build something more complex.</p>
---

This body text is ignored — the blocks in the frontmatter are what render on the page.
