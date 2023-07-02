import { Injectable } from '@angular/core';
import { HoleService } from '../service/hole.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  static calcSum = (scores: number[]): number => {
    return scores.reduce((acc: number, cur: number) => acc + cur);
  }
}
