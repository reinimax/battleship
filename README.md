# Battleship

My version of the game [Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>) for the TOP Javascript curriculum. The main goal was to start learning about unit testing with [Jest](https://jestjs.io/).

It was a very fun project and I liked especially working on the game logic and improving the computer player. I struggled with using Jest and got a bit lazy with writing tests versus the end of the project, once I had my user interface ready. I didn't find a good way to test states of the gameboard (e.g. I hit a certain field -> the gameboard should contain an object representing the field with the expected values. Somehow I didn't get "contains" to work, Jest seems to expect deep equality there).

However, in general I liked the TDD approach very much for two reasons:

- Once you wrote good, comprehensive unit tests for a function (not that easy!), you can simply depend on it. This makes bugfixing far quicker and easier and may prevent many bugs in the first place.
- It pushes you to think more about architecture and interface and encourages better code (to quote The Odin Project: "Test driven development encourages better program architecture because it encourages you to write Pure Functions." Again, easier said than done. I think my later functions in this project especially are kind of tightly coupled behemoths, which only occurred to me when I (unsuccessfully) tried to test them. Maybe I should have moved the whole AI part out of the player module into its own module and split it up way more to distinguish better between input/output and side effects. But hey, I'm here to learn, not to be perfect at the first try).

One thing I'm unsure about is testing private stuff. In some cases I exported properties and methods that were meant to be private, simply to be able to test them. In some cases this was due to my struggles with testing the interface. In an ideal world, one should gauge the working of the private stuff by looking at the public output/side effects. On the other hand, there are cases, e.g. the AI, where it's really hard to see from the public interface if it's internal workings are 100% correct. I definitely want to peek in there to see if everything's running correctly.

Assets:
https://opengameart.org/content/space-ships-2-0
