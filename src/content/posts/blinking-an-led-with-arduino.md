---
title: 'Week 2 Studio Cycle: Esp32 Dev board'
date: 2025-09-20
summary: Using 2 esp32 development boards with attached LCD display and Claude Code, I prototyped a mini digital typewriter and drawing pad.
cover: /uploads/Screenshot 2026-10-03 at 10.01.50 PM.png
draft: false
status: completed
blocks:
  - type: paragraph
    body: |-
      The inspiration behind this project was a project that I did for another ATLAS class last semester. I got these two dev boards over the summer so I could start prototyping version 2 of my pocket notetaker device, but really never got around to it, so I thought this assignment would be a great opportunity to start developing. Claude Code is what I used mainly, and also had another chat running on the side to ask questions. Eventually I was able to make it work exactly as I originally envisioned.

      The way I wanted it to work was by creating a notes app and navigation menu on the top board, and a keyboard/drawing pad on the bottom board. In the notes app, I wanted the top board to be a scrollable canvas where you can arrange your text boxes and drawings, change color and size of text and pens, and eventually be able to save files as a pdf or png in a files app, for when you want to save your memos and share them, but they will always be editable in the notes app.
  - type: heading
    text: The Prompt
  - type: paragraph
    body: |-
      I first had an existing claude chat that I used for version 1 to write me a prompt to give to claude code based on the hardware I had and the vision for this project. This was really helpful so that Claude Code could immediately recognize what we were working with, then writing in my own words my goals for the project:

      "I'm programming a DIYmalls JC2432W328C ESP32 board. 
      It has a 2.8" ST7789 TFT display (240x320), CST820 
      capacitive touch over I2C, and uses the Arduino framework. 
      Display pins: MOSI=13, SCLK=14, CS=15, DC=2, BL=27. 
      Touch pins: SDA=33, SCL=32, RST=25, INT=21, I2C addr=0x15. 
      Libraries: LovyanGFX for display, LVGL v9 for UI.

      i have two of these capacitive touch boards and am designing an embedded system inside of a custom enclosure that will act as a standalone notetaking device, eventually want to build more features into the system but for now i want to get a working UI. One of the boards will be a keyboard UI and the other will act as the notebook screen that can be drawn on, typed on, and navigated through to different menus and apps. I started with this github repo and did the screen test and everything worked as planned [https://github.com/pay191/DIY_Malls-JC2432W328C_Tests](https://github.com/pay191/DIY_Malls-JC2432W328C_Tests). now i want to begin developing this board and need a good starting point."

      This was a great starting point but I had to do probably 50 more prompts before making it perfect. There was a lot of small adjustments I never thought about initially, like how the text box resizes text, making the text in the selected text box appear simultaneously in the keyboard text box/having it disappear when unselected. Similar issues came about when developing the drawing board. It took a lot more programming and memory to allow multiple pen colors in one drawing. There was also the task of editing the features so that you could edit your drawing and reflash it to the same box on the canvas screen. The way the screens talk to each other is through ESPNOW.
  - type: heading
    text: Demo
  - type: youtube
    caption: ''
    url: https://youtube.com/shorts/pWZtq7ZiWz4?si=bURVoJKuFA0ZOJ6C
  - type: heading
    text: Takeaway
  - type: paragraph
    body: This prototype was an idea I've had for a while and using Claude Code really made the process smooth and fast. Within the first few prompts I realized it was a much bigger task than I originally planned for. Even with the help of Claude, I ran into issues (see below) and had to make a lot of tweaks to get it to work exactly how I wanted. I didn't make it as aesthetically pleasing as I had planned either. With trying to get everything to work correctly, I didn't have enough time to adjust to look of the interface and just kept everything default. I also didn't get to adding a files app or the ability to save as a document/image file. In the future, I want to continue developing this further and adding more features.
  - type: photo
    image: /uploads/IMG_2503.jpeg
    alt: Claude got a confused during keyboard phase
    caption: Claude got a confused during keyboard phase
    width: normal
---

This body text is ignored — the blocks in the frontmatter are what render on the page.
