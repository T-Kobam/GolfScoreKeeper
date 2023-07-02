import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoleService {
  private no: number;
  private par: number;

  constructor() {
    this.no = 0;
    this.par = 0;
  }

  getNo = (): number => {
    return this.no;
  }

  setNo = (x: number): void => {
    this.no = x;
  }

  getPar = (): number => {
    return this.par;
  }

  setPar = (x: number): void => {
    this.par = x;
  }
}
