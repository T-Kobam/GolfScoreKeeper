import { Injectable } from '@angular/core';
import { HoleService } from './hole.service';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private static totalNumber: number = 1;
  private no: number;
  private name: string;
  private scores: number[];
  private holes: HoleService[];
  private total: number;
  private result: number[];
  private totalResult: number;

  constructor() {
    this.no = PlayerService.totalNumber;
    this.name = "";
    this.scores = [];
    this.holes = [];
    this.total = 0;
    this.result = [];
    this.totalResult = 0;
    PlayerService.totalNumber++;
  }

  initScores = (holeNumber: number): void => {
    this.scores = new Array<number>(holeNumber);
    this.total = 0;
    this.result = new Array<number>(holeNumber);
    this.totalResult = 0;
  }

  getNo = (): number => {
    return this.no;
  }

  getName = (): string => {
    return this.name;
  }

  setName = (s: string): void => {
    this.name = s;
  }

  getHoles = (): HoleService[] => {
    return this.holes;
  }

  /**
   * HoleServiceの配列を設定する
   * (scoresは初期化される)
   * @param o 
   */
  setHoles = (o: HoleService[]): void => {
    this.holes = o;
    this.scores = new Array(this.holes.length);
  }

  getScores = (): number[] => {
    return this.scores;
  }

  getHole = (holeNumber: number): HoleService => {
    return this.holes[holeNumber - 1];
  }

  setHole = (o: HoleService): void => {
    this.holes.push(o);
    this.scores.push();
  }

  getScore = (holeNumber: number): number => {
    return this.scores[holeNumber];
  }

  getTotal = (): number => { 
    return this.total;
  }

  getTotalResult = (): number => {
    return this.totalResult;
  }

  /**
   * 指定されたHoleのscoreを設定する
   * @param holeNumber 
   * @param score 
   */
  setScore = (holeNumber: number, score: number): void => {
    this.total += Number(score);
    this.scores[holeNumber] = score;
  }
  
  getResult = (holeNumber: number): number => {
    return this.result[holeNumber];
  }

  setResult = (holeNumber: number, result: number): void => {
    this.totalResult += Number(result);
    this.result[holeNumber] = result;
  }
}
