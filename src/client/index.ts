import 'phaser';
import { Game } from './game/game';
import { GameScene } from './game/gameScene';
import './assets/stylesheets/styles.scss';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Monster Hunting Game',
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#18216D',
  scene: [new GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  fps: {
    min: 10,
    target: 60,
    forceSetTimeOut: false,
    deltaHistory: 10
  }
};

window.onload = () => { 
  var game = new Game(gameConfig); 
};