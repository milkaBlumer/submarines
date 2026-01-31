🚢 Submarine Battle Game 

A JavaScript-based Battleship game where players discover hidden submarines using logic, strategy, and speed.

The game includes two play modes: Marathon Mode and Speed Mode.

🎮 Game Modes
🏃 Speed Mode (Time-Based)

The player has 60 seconds to discover all submarines.

Goal: find all submarines as fast as possible.

If time runs out before all submarines are discovered → Game Over.

🏋️ Marathon Mode (Score-Based)

The player starts with 400 points.

Each move reduces the score.

Goal: discover all submarines before the score drops below 0.

If the score goes below 0 → Game Over.

Focuses on strategy and accuracy rather than speed.

✨ Features

10x10 interactive game board

Random submarine placement (no overlap & no adjacent submarines)

Two game modes: Speed & Marathon

Score system

Timer system

Explosion animation & sound effects

Win / Lose screens

Leaderboard (Top 3 players) using LocalStorage

Player name support

Multiple submarine sizes and images

🛠️ Technologies Used

JavaScript (Vanilla JS)

HTML

CSS

LocalStorage

Async/Await

Timers & Events

🚀 How to Run the Project

Clone the repository:

git clone https://github.com/your-username/submarine-game.git


Open the project folder.

Run the game by opening:

homePage.html


(or the main HTML file) in your browser.

No installation required.

🧠 Game Logic Overview

Submarines are placed randomly on the board.

Placement algorithm ensures:

No overlapping submarines

No neighboring submarines

Player clicks cells to search for submarines.

When all submarines are discovered → Victory screen.

When time runs out or score drops below 0 → Game Over.

🏆 Leaderboard

The game saves the top 3 results using LocalStorage:

Player name

Score

Level

Game mode

👩‍💻 Author

Developed by Milka Blumer
JavaScript game project for practicing DOM manipulation, game logic, and algorithms.
