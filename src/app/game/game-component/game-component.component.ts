import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser'; //import Phaser
import { MainScene } from '../scenes/main.scene';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game-component.component.html',
  styleUrl: './game-component.component.css'
})
export class GameComponent implements OnInit {
  //declare phaserGame variable, the ! is needed for it to be valid code in Angular, we just have to make sure we initialize it in ngOnInit
  phaserGame!: Phaser.Game; 
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 400,
      scene: [ MainScene ],
      parent: 'gameContainer',
      title: "Joanna's Breakout",
      backgroundColor: "#af4670",
      physics: {
        default: 'arcade',
        
      },
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}

