import { Component } from '@angular/core';
import { HoleService } from '../service/hole.service';
import { PlayerService } from '../service/player.service';
import { UtilService } from '../utils/util.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  headerTitle: string;
  holes: HoleService[];
  players: PlayerService[];
  totalParForHole: number;
  isPtagParForHole: boolean[]; // ParForHoleのpタグ表示制御フラグ
  isPtagScore: boolean[]; // Scoreのpタグ表示制御
  isRetryParForHole: boolean;
  isRetryScore: boolean;
  result: number[];
  totalResult: number;

  constructor() {
    this.headerTitle = "Golf Score Keeper";
    this.holes = [];
    this.players = [];
    this.totalParForHole = 0;
    this.isPtagParForHole = [];
    this.isPtagScore = [];
    this.isRetryParForHole = false;
    this.isRetryScore = false;
    this.result = [];
    this.totalResult = 0;
  }

  /**
   * 画面にコース名を表示する(golfcourseでEnterが押下された時)
   * @param event 
   */
  onKeyDownForGolfCourse = (event: any): void => {
    const courseName: string = event.target.value;
    this.headerTitle = `Golf Score Keeper For ${courseName}`;
  }

  onKeyDownForPlayerName = (event: any): void => {
    // player name の取得
    const playerName: string = event.target.value;

    // PlayerServiceクラスの作成
    const player: PlayerService = new PlayerService();
    player.setName(playerName);
    this.players.push(player);

    if (this.holes.length === 0) {
      const hole: HoleService = new HoleService();
      hole.setNo(1);
      this.holes.push(hole);
    }

    // PlayerServiceクラスのスコアを初期化
    this.players.forEach(p => {
      p.initScores(this.holes.length);
    });
  }

  /**
   * 画面にコース表を表示する()
   * @param event 
   */
  onChangeForHoles = (event: any): void => {
    const numberOfHoles: number = event.target.value;

    // HoleServiceクラスを初期化
    this.holes = [];
    // ParForHoleのinputタグ表示制御フラグリストの初期化
    this.isPtagParForHole = [];
    // scoreのpタグ表示制f御フラグリストの初期化
    this.isPtagScore = [];
    // 結果の初期化
    this.result = [];
    this.totalResult = 0;
    // 再入力ボタンを非表示にする
    this.isRetryParForHole = false;

    // HoleServiceクラスの作成
    for (let i = 0; i < numberOfHoles; i++) {
      const hole: HoleService = new HoleService();
      hole.setNo(i + 1);

      // HoleServiceクラスの要素に設定
      this.holes.push(hole);

      // PlayerServiceクラスのスコアを初期化
      this.players.forEach(p => {
        p.initScores(this.holes.length);
      });

      // ParForHoleのpタグ表示制御フラグ初期化
      this.isPtagParForHole.push(false);

      // scoreのpタグ表示制御フラグ初期化
      this.isPtagScore.push(false);

      // 結果の初期化
      this.result.push(0);
    }
  }

  /**
   * 各ホールのparの数字を表示する(ParForHoleに数字が入力された時)
   * @param event 
   */
  onKeyDownForParForHole = (event: any): void => {
    const parForHole: number = event.target.value;
    const holeNo: number = event.target.name;

    this.holes[holeNo - 1].setPar(parForHole);

    // Parの合計を計算
    this.totalParForHole = UtilService.calcSum(this.holes.map(hole => Number(hole.getPar())));

    // ParForHoleのpタグ表示制御フラグを立てる
    this.isPtagParForHole[holeNo - 1] = true;

    // 全Holeの入力後、再入力ボタンを表示する
    if (this.isPtagParForHole.every(bool => bool === true)) {
      this.isRetryParForHole = true;
    }
  }

  /**
   * スコアと結果を反映する(スコア入力時)
   * @param event 
   */
  onKeyDownForScore = (event: any): void => {
    const score: number = event.target.value;
    const holeNo: number = event.target.name;
    const playerNo: number = event.currentTarget.id;

    // 結果の反映
    this.players[playerNo - 1].setResult(holeNo - 1, score - this.holes[holeNo - 1].getPar());

    // scoreのpタグ表示制御フラグを立てる
    this.isPtagScore[holeNo - 1] = true;

    this.players[playerNo - 1].setScore(holeNo - 1, score);

    // 入力値を初期化
    event.target.value = "";

    // 全Holeのscore入力後、再入力ボタンを表示する
    if (this.isPtagScore.every(bool => bool === true)) {
      this.isRetryScore = true;
    }

  }

  /**
   * ParForHoleを再入力する(再入力ボタン押下時)
   * @param event 
   */
  onClickParForHole = (event: any): void => {
    // 全てのParForHoleの入力が完了後、再度入力できるように設定
    if (this.isPtagParForHole.every(bool => bool === true)) {
      this.isPtagParForHole = this.isPtagParForHole.map(bool => bool = false);
    }

    this.isRetryParForHole = false;
  }

  onClickReset = (event: any): void => {
    this.headerTitle = "Golf Score Keeper";
    this.holes = [];
    this.players = [];
    this.totalParForHole = 0;
    this.isPtagParForHole = [];
    this.isPtagScore = [];
    this.isRetryParForHole = false;
    this.isRetryScore = false;
    this.result = [];
    this.totalResult = 0;
  }
}
